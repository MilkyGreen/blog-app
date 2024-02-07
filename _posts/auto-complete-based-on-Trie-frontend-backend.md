---
title: "基于 Trie 字典树的自动补全前后端实现"
date: "2022-08-22T05:35:07.322Z"
author:
  name: 李云梦
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

### 技术栈
后端语言 Java，数据库 mongodb

### 需求
不引入额外技术栈的情况下，在搜索框实现对标题字段的简单自动补全功能。
不要对后端尤其是数据库造成太大负担。

### 总体思路
因为功能比较简单，所以没打算引用ES之类的搜索引擎。需要利用先有的工具来实现。

旧的方案是：前端每次检测到输入框有字符键入的时候，就通过接口请求后端，后端再到数据库进行模糊查询。这种方法效果还可以，问题是情况数据库过于频繁，而且是前后都匹配的模糊查询，所以比较消耗性能，在负载高的时候会有一些延迟。

Google 了一下，网上大部分的自动补全教程都推荐使用 Trie (字典树、前缀树)来实现，对 Trie 不了解的可以看<a href="https://zhuanlan.zhihu.com/p/340228499">这里</a>。Trie 确实是实现自动补全功能最完美的数据结构，只要根据输入框中的内容生成 Trie，前端就可以单独完成自动补全的功能，不用再请求后端，而且速度很快。

问题在于，后端如何维护 Trie 呢？

需要补全的内容是列表的标题字段，标题字段保存在各个记录中。直观的想法是对所有标题进行一次查询，用查询出来的全部标题列表构建成一个全量 Trie，保存到某个地方（数据库或者缓存）。每次前端会传一个前缀过来，后端把全量 Trie 加载到内存，根据前缀查询出子 Trie ，把子 Trie 返回给前端。

这样做理论上可行，不过有几个缺点。1）标题的新增、修改和删除，都需要实时同步到 Trie 中，而 Trie 数据全局唯一，如果遇到频繁的标题修改或删除，可能会遇到并发问题，要么加锁影响性能，要么不加锁数据一致。2）数据量大的时候，Trie 对象可能会非常庞大，占用大量内存。

维护一个全局 Trie 的想法似乎不太好，另一个思路是动态的维护 Trie 。

可以确定的一点是，**前端至少会在用户第一次输入的时候请求一次后端**，此时标题的前缀是知道的，后端要返回的只是这个前缀的 Trie 。所以可以利用这个前缀在数据库进行一次左侧匹配的模糊查询，把以这个前缀开头的标题先都查出来，在内存中以这个标题列表为输入构建一个 Trie ，返回给前端。后续的自动补全肯定只能是这个 Trie 中的内容，其他的标题是不用关心的。

也可以直接返回列表给前端，前端自行构建 Trie 。

用这个方法就做到了只查询一次数据库，就获取了后续操作中的全补全数据。前端只需要在用户清空搜索框的时候，才重新请求后端获取新的数据 ，其他情况下都可以独立完成补全功能。

### 后端实现
后端主要有两步工作，1）以前缀字符串进行数据库的模糊匹配查询，这个操作不管是在关系型数据库还是nosql中都比较简单。2) 根据列表构建一个 Trie。最后会贴上一个 Java 的 Trie 实现。第2步的工作也可以交给前端去做。

### 前端实现
前端使用 Trie 实现自动补全的文章很多，这里随便贴两个仅供参考:

https://www.npmjs.com/package/trie-autocomplete  
这个是前端的 Trie 库，可以直接用通过列表创建 Trie ，后端的第二步可以省去，直接返回列表即可。

https://blog.csdn.net/weixin_34014277/article/details/88754452


### 一些细节：
如果以某个字符开头的标题太多，构建出来的 Trie 会非常大，补全的下拉列表会很长。此时限制查询的列表数据，或者不补全，等待输入后续的内容，缩小 Trie 的范围。太长的下拉列表后面的内容可能不会有人看。

### Trie Java实现：

```

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class Trie implements Serializable {

    /**
     * 根据字符串列表构建字典树
     * @param contents 列表
     * @return Trie
     */
    public static Trie buildTrie(List<String> contents){
        Trie trie = new Trie();
        if(contents != null && contents.size() > 0){
            for (String content : contents) {
                trie.insert(content);
            }
        }
        return trie;
    }

    /**
     * 根据前缀获取关联内容。最多10条
     * @param prefix 前缀字符串
     * @return 关联内容列表
     */
    public List<String> getSubs(String prefix){
        return getSubs(prefix,10);
    }

    /**
     * 根据前缀获取关联内容，可指定最大返回数量
     * @param prefix 前缀字符串
     * @param maxSize 最大返回数量
     * @return 关联内容列表
     */
    public List<String> getSubs(String prefix,int maxSize){
        List<String> list = new ArrayList<>();
        TrieNode node = findPrefix(prefix);
        if(node != null){
            getContentsByDFS(node,list,maxSize);
        }
        return list;
    }

    /**
     * 以深度优先的方式遍历node下所有的字符串，添加到list中。最多maxSize条
     * @param node 前缀节点
     * @param list 结果列表
     * @param maxSize 结果最大数量
     */
    private void getContentsByDFS(TrieNode node,List<String> list,int maxSize){

        HashMap<Character, TrieNode> children = node.getChildren();
        for (Map.Entry<Character, TrieNode> entry : children.entrySet()) {
            TrieNode trieNode = entry.getValue();
            if(trieNode.isEnd){
                list.add(trieNode.content);
                if(list.size() >= maxSize){
                    return;
                }
            }

            getContentsByDFS(trieNode,list,maxSize);

            if(list.size() >= maxSize){
                return;
            }
        }
    }

    /**
     * 字典树节点
     */
    @Data
    static class TrieNode{
        // 子节点
        private HashMap<Character, TrieNode> children = new HashMap<>();
        // 当前节点代表的字符串内容（isEnd == true 时有值）
        private String content;
        // 是否是字符串结尾
        private boolean isEnd;
    }

    // 根节点
    private TrieNode root = new TrieNode();

    /**
     * 插入一个字符串到字典树中
     * @param word 字符串
     */
    public void insert(String word) {
        TrieNode current = root;

        for (char l: word.toCharArray()) {
            HashMap<Character, TrieNode> children = current.getChildren();
            if(!children.containsKey(l)){
                children.put(l,new TrieNode());
            }
            current = children.get(l);
        }
        current.setEnd(true);
        current.setContent(word);
    }

    /**
     * 判断一个字符串是否存在于字典树中
     * @param word 字符串
     * @return 是否存在
     */
    public boolean contains(String word) {
        TrieNode current = findPrefix(word);
        return current != null && current.isEnd();
    }

    /**
     * 根据前缀字符串查询节点。如果不包含此前缀返回null
     * @param prefix 前缀字符串
     * @return TrieNode
     */
    public TrieNode findPrefix(String prefix) {
        TrieNode current = root;
        for (int i = 0; i < prefix.length(); i++) {
            char ch = prefix.charAt(i);
            TrieNode node = current.getChildren().get(ch);
            if (node == null) {
                return null;
            }
            current = node;
        }
        return current;
    }

    public static void main(String[] args) {
        ArrayList<String> contents = new ArrayList<>();
        contents.add("一3二");
        contents.add("一");
        contents.add("一四333");
        contents.add("一四456");
        contents.add("一四4444");
        contents.add("一四555");
        contents.add("一四6666");
        contents.add("二#77777");
        contents.add("0");
        contents.add("life");

        Trie trie = Trie.buildTrie(contents);

        List<String> subs = trie.getSubs("一");
        System.out.println(String.join(";",subs));

        subs = trie.getSubs("一",4);
        System.out.println(String.join(";",subs));

        subs = trie.getSubs("一四");
        System.out.println(String.join(";",subs));

        subs = trie.getSubs("一四",2);
        System.out.println(String.join(";",subs));

        subs = trie.getSubs("一四4");
        System.out.println(String.join(";",subs));
    }
}
```
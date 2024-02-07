---
title: "MySql中按照拼音首字母查询汉字"
date: "2019-12-10T05:35:07.322Z"
author:
  name: 李云梦
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

在MySql中按照拼音首字母查询汉字，如参数“MG”可以查询出“咪咕”，关键在于汉字与拼音的转换。

个人实践下来，发现很难在不增加额外字段的情况下实现完整的功能。下面是实践过程。

一开始没啥思路，网上搜了一下，大部分解决方案都是利用一个汉字与拼音的转换函数，函数定义如下：

```
DROP FUNCTION IF EXISTS `getPY`;
DELIMITER ;;
CREATE FUNCTION `getPY`(in_string VARCHAR(16383))
  RETURNS MEDIUMTEXT CHARSET utf8
  BEGIN
    DECLARE tmp_str VARCHAR(16383)
    CHARSET gbk DEFAULT ''; #截取字符串，每次做截取后的字符串存放在该变量中，初始为函数参数in_string值
    DECLARE tmp_len SMALLINT DEFAULT 0; #tmp_str的长度
    DECLARE tmp_char VARCHAR(2)
    CHARSET gbk DEFAULT ''; #截取字符，每次 left(tmp_str,1) 返回值存放在该变量中
    DECLARE tmp_rs VARCHAR(16383)
    CHARSET gbk DEFAULT ''; #结果字符串
    DECLARE tmp_cc VARCHAR(2)
    CHARSET gbk DEFAULT ''; #拼音字符，存放单个汉字对应的拼音首字符
    SET tmp_str = in_string; #初始化，将in_string赋给tmp_str
    SET tmp_len = LENGTH(tmp_str); #初始化长度
    WHILE tmp_len > 0 DO #如果被计算的tmp_str长度大于0则进入该while
      SET tmp_char = LEFT(tmp_str, 1); #获取tmp_str最左端的首个字符，注意这里是获取首个字符，该字符可能是汉字，也可能不是。
      SET tmp_cc = tmp_char; #左端首个字符赋值给拼音字符
      IF LENGTH(tmp_char) > 1
      THEN
        SELECT ELT(INTERVAL (CONV(HEX(CONVERT(tmp_char USING gbk)), 16,
                                  10), 0xB0A1, 0xB0C5, 0xB2C1, 0xB4EE, 0xB6EA, 0xB7A2, 0xB8C1, 0xB9FE, 0xBBF7, 0xBFA6, 0xC0AC
          , 0xC2E8, 0xC4C3, 0xC5B6, 0xC5BE, 0xC6DA, 0xC8BB, 0xC8F6, 0xCBFA, 0xCDDA, 0xCEF4, 0xD1B9, 0xD4D1), 'A', 'B',
                   'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W',
                   'X', 'Y', 'Z')
        INTO tmp_cc; #获得汉字拼音首字符
      END IF;
      SET tmp_rs = CONCAT(tmp_rs, tmp_cc); #将当前tmp_str左端首个字符拼音首字符与返回字符串拼接
      SET tmp_str = SUBSTRING(tmp_str, 2); #将tmp_str左端首字符去除
      SET tmp_len = LENGTH(tmp_str); #计算当前字符串长度
    END WHILE;
    RETURN tmp_rs; #返回结果字符串
  END;
DELIMITER ;
```
使用方法：
```
SELECT getPY('掘金社区');
```
可以得到结果“JJSQ”，看上去完美解决了问题。但是，当输入一些稍微不常见的汉字（如：咪、犸、怡、妍等）的时候，返回的统统是“Z”，咋回事？

仔细研究了上面的函数，大概逻辑是循环截取字符串最左侧的字符，对拿到的字符进行编码、进制转换，与一些固定的值进行比较，根据转换后字符所在的区间确定拼音的首字母。

关键代码在这里：
```
SELECT ELT(INTERVAL (CONV(HEX(CONVERT(tmp_char USING gbk)), 16,
                                  10), 0xB0A1, 0xB0C5, 0xB2C1, 0xB4EE, 0xB6EA, 0xB7A2, 0xB8C1, 0xB9FE, 0xBBF7, 0xBFA6, 0xC0AC
          , 0xC2E8, 0xC4C3, 0xC5B6, 0xC5BE, 0xC6DA, 0xC8BB, 0xC8F6, 0xCBFA, 0xCDDA, 0xCEF4, 0xD1B9, 0xD4D1), 'A', 'B',
                   'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W',
                   'X', 'Y', 'Z')
```
先解释一些几个内置函数的意义：

convert(expr USING encode)：不同字符集之间的数据转换

hex(Number or Str)：将数字或字符串转换为十六进制

conv(Number, from, to)：将数字从原来的进制转换成指定的进制

interval(N,N1,N2,N3,......)：将N的值与后面的值列表进行比较。假如N < N1，则返回值为0；假如N < N2 等等，则返回值为1；假如N < N3 等等，则返回值为2;.....以此类推;假如N 为NULL，则返回值为 -1 。所有的参数均按照整数处理。为了这个函数的正确运行，必须满足 N1 < N2 < N3 < ……< Nn 

elt(N,str1,str2,str3,...)：若N = 1，则返回值为 str1，若N = 2，则返回值为 str2，以此类推。若N 小于1或大于参数的数目，则返回值为 NULL。

这段代码的具体逻辑是：
1. 将tmp_char也就是要转换的字符转成GBK编码
2. 转换成16进制
3. 转换成10进制
4. 判断转换后的值在0xB0A1, 0xB0C5, 0xB2C1...这些值中的区间
5. 区间的排序即为对应的拼音首字母

为啥0xB0A1, 0xB0C5, 0xB2C1...可以确定一个汉字的拼音呢？其实关键点在这里：
```
CONVERT(tmp_char USING gbk)
```
需要把字符先转换成GBK编码，否则是完全不准的。0xB0A1, 0xB0C5, 0xB2C1去掉0x(十六进制数字的前缀标志)之后，在GBK编码表中搜索，发现他们代表的汉字位置很特殊，处于声母临界的地方：B0A1->啊；B0C5->芭；B2C1->擦；...最后一个是D4D1->匝。

函数先将汉字转成GBK编码，再与这些声母临界的字符编码进行比较，确定了第一个拼音的区间，比如在B0C5->芭 和 B2C1->擦 中间的就是b开头，挺巧妙的。

只是这样行的通的前提是，所有的汉字在GBK中都严格按照拼音排序。只可惜只有部分特别常用的汉字时这样的，原因如下：
> GBK编码，是对GB2312编码的扩展，因此完全兼容GB2312-80标准。

涵盖内容还顺序：
> a. GB 2312 汉字区。即 GBK/2: B0A1-F7FE。收录 GB 2312 汉字 6763 个，按原顺序排列。
b. GB 13000.1 扩充汉字区。包括：
(1) GBK/3: 8140-A0FE。收录 GB 13000.1 中的 CJK 汉字 6080 个。
(2) GBK/4: AA40-FEA0。收录 CJK 汉字和增补的汉字 8160 个。CJK 汉字在前，按 UCS 代码大小排列；增补的汉字（包括部首和构件）在后，按《康熙字典》的页码/字位排列。

原来汉字的编码只有GB 2312，只包含6763个汉字，GBK完全兼容了GB 2312的内容和顺序，并增加了一万多个汉字，但是顺序是按《康熙字典》的页码/字位排列，那些新增的汉字，编码值都比 D4D1->匝 大，所以都识别成了Z。

问题是GBK新增的汉字中，有很大一部分都是如今比较常用的汉字，只是当初没被收进GB 2312的编码里，所以上面那种函数在实际使用当中会的识别率会很差。

汉字转拼音还有其他办法吗？这时候想到了pinyin4j，一个汉字转拼音的类库。down下来看了眼代码，一下就放心了。

pinyin4j非常稳健的把所有汉字的Unicode编码和其拼音（还带读音）放到了一个配置文件里：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/10/16eefecc2b3511e2~tplv-t2oaga2asx-image.image)
用下面的方法得到字符的Unicode编码
```
Integer.toHexString('啊')
```
去配置文件里get拼音就行了。

最后，老老实实的在数据库加了个拼音字段，在汉字入库之前就用pinyin4j拿到拼音存进去，再也不用担心查不准拼音了。

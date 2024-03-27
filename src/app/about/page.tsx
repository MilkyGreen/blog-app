import Content from "@/app/about/aboutme";

export default function Index() {
    return (
        <div className="grid grid-cols-12">
            <div className="justify-center col-span-3 items-center grid grid-cols-1 ml-20">
                <div className="">Li Yunmeng</div>
                <div>
                    liyunmeng2017@gmail.com
                </div>
                <div className="flex">
                    <a href="https://github.com/MilkyGreen" target="_blank"  className="mr-2 text-blue-400 underline">Github</a>
                    <a href="https://www.linkedin.com/in/li-yunmeng-2a040590/" target="_blank" className="mr-2  text-blue-400 underline">Linkedin</a>
                    <a href="https://leetcode.cn/u/milkygreen/" target="_blank" className="mr-2 text-blue-400 underline">Leetcode</a>
                </div>
                <div className=" h-10"></div>
            </div>
            <div className="col-span-7">
                <Content />
            </div>
            
        </div>
        
    );
}

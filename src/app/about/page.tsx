import Content from "@/app/about/aboutme";

export default function Index() {
    return (
        <div className="grid grid-cols-12 gap-4 mx-40">
            <div className="flex justify-center col-span-3 items-center">
                Li Yunmeng
            </div>
            <div className="col-span-7 font-extralight">
                <Content />
            </div>
            
        </div>
        
    );
}

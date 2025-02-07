import { ShareIcon } from "./icons/ShareIcon"

interface CardProps {
    title: string,
    link: string,
    type: "youtube" | "twitter"
}

export const Card = ({ title, link, type }: CardProps) => {
    return <div className="group transform transition-transform duration-300 ease-out hover:scale-[1.01]">
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow duration-300 ease-out hover:shadow-lg">
            <div className="flex justify-between mb-4">
                <div className="flex items-center text-lg font-medium text-gray-800">
                    <div className="text-indigo-500 pr-3">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center gap-3">
                    <a href={link} target="_blank" className="text-gray-400 transition-colors duration-200 C hover:text-indigo-500">
                        <ShareIcon />
                    </a>
                    <button className="text-gray-400 transition-colors duration-200 ease-out hover:text-indigo-500">
                        <ShareIcon />
                    </button>
                </div>
            </div>

            <div className="rounded-lg overflow-hidden">
                <div className="pt-4">
                    {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>}
                </div>
            </div>
        </div>
    </div>
}
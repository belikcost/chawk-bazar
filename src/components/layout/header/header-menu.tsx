import {useState} from "react";
import Link from "@components/ui/link";
import classNames from "classnames";
import {IoClose} from "react-icons/io5";

interface MenuProps {
    data: any;
    className?: string;
    closeMenu: () => void;
}


const HeaderMenu: React.FC<MenuProps> = ({data, className, closeMenu}) => {
    const [showCategory, setShowCategory] = useState(data[0].id);

    const getShowCategory = (id: number) => {
        return data.find((item: { id: number; }) => item.id === id);
    }

    return (
        <nav className={classNames(`headerMenu flex w-full absolute bg-white`, className)}>
            <div className="flex flex-col max-h-full menuCol">
                {data?.map((item: any) => (
                    <div
                        className="menuItem cursor-pointer"
                        onMouseEnter={() => setShowCategory(item.id)}
                        key={item.id}
                    >
                        <Link
                            href={item.slug}
                            className="inline-flex items-center text-sm xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative"
                        >
                            <img className="w-7 mr-1.5" src={item.image} alt={item.name}/>
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex flex-col px-10 py-5">
                {getShowCategory(showCategory).parentcategory.map((category: any) => (
                    <Link href={category.slug} key={category.id} className="hover:text-black">
                        {category.name}
                    </Link>
                ))}
            </div>
            <button
                className="flex absolute top-0 right-0 px-5 text-2xl items-center justify-center text-gray-500 focus:outline-none transition-opacity hover:opacity-60"
                onClick={closeMenu}
                aria-label="close"
            >
                <IoClose className="text-black mt-1 md:mt-0.5" />
            </button>
        </nav>
    );
};

export default HeaderMenu;

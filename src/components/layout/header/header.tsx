import React, {useRef, useState} from "react";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import SearchBox from "@components/common/search-box";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
	ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;
const Header: React.FC = () => {
	const {
		openSidebar,
		setDrawerView,
		openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI();
	const { t } = useTranslation("common");
	const siteHeaderRef = useRef() as DivElementRef;
	addActiveScroll(siteHeaderRef);

	const [showMenu, setShowMenu] = useState(false);

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
	function handleMenu() {
		if (document.documentElement.clientWidth > 1000) {
			setShowMenu(!showMenu);
		} else {
			setDrawerView("MOBILE_MENU");
			return openSidebar();
		}
	}

	return (
		<header
			id="siteHeader"
			ref={siteHeaderRef}
			className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
		>
			<div className="innerSticky text-gray-700 body-font bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
				<div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
					<Logo />
					<button
						aria-label="Menu"
						className="menuBtn flex flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
						onClick={handleMenu}
					>
						<span className="menuIcon">
							<span className="bar" />
							<span className="bar" />
							<span className="bar" />
						</span>
					</button>

					<div className="flex-shrink-0 ms-auto lg:me-5 xl:me-8 2xl:me-10">
						<SearchBox/>
					</div>
				</div>
			</div>
			{showMenu && (
				<HeaderMenu
					data={site_header.menu}
					closeMenu={() => setShowMenu(false)}
					className="flex z-30"
				/>
			)}
		</header>
	);
};

export default Header;

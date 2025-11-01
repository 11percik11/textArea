import { useLocation, useNavigate } from "react-router-dom";
import "./PopupCreateLink.scss";
import { linkStore } from "../../../store/LinkHref";
import { PathlinkStore } from "../../../store/PathLink";

import { ArrowSelectLink } from "./ui/ArrowSelectLink/ArrowSelectLink";
import { CreateSelect } from "./ui/CreateSelect/CreateSelect";

export const PopupCreateLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  

  const crateLinkBack = location.pathname.slice(1) + location.search;
  const LinkBack = linkStore.link.href;
  const createLinkHref = () => {
    linkStore.link.href = crateLinkBack;
    linkStore.setShowHeader(false);
    navigate(LinkBack);
  };

  const BackLink = () => {
    linkStore.setShowHeader(false);
    navigate(LinkBack);
  };

  

  return (
    <div className="bg-white pl-[32px] pr-[32px] w-[100%] h-[68px] fixed z-20 flex items-center gap-[38px]">
      <div
        onClick={BackLink}
        className="w-[94px] h-[44px] flex items-center rounded-[12px] text-[20px] font-[600] justify-center border-[2px] border-[#FF9797] text-[#FF9797]"
      >
        Выйти
      </div>
      <div className="flex-1 flex items-center gap-[6px] text-[#004662] text-[20px] font-[600]">
        <ArrowSelectLink/>
        {/* <div>{arrTT.map((item) => <div>{item[1].map((e) => e)}</div>)}</div> */}
        <CreateSelect/>
      </div>
      <div
        onClick={createLinkHref}
        className="w-[189px] h-[44px] rounded-[12px] flex items-center justify-center text-[20px] font-[600] text-white bg-[#004662] font"
      >
        Указать ссылку
      </div>
    </div>
  );
};

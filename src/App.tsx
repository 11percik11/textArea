import { BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { VirtualKeyboardProvider } from "./comps/VirtualKeyboard/VirtualKeyboard";
import { linkStore } from "./store/LinkHref";
import { PopupCreateLink } from "./comps/modals/PopupCreateLink/PopupCreateLink";
import { RouterPath } from "./Router";
import { ButtonSwitchAdminPanel } from "./comps/ButtonSwitchAdminPanel/ButtonSwitchAdminPanel";

const App = () => {
  const PopupShow = linkStore.link.showHeader;
  // const location = useLocation();

  return (
    <div className="w-[1920px] h-[1080px] top-0 left-0">
      <VirtualKeyboardProvider>
        <Router>
          <ButtonSwitchAdminPanel/>
          {PopupShow && <PopupCreateLink />}
          <RouterPath />
        </Router>
      </VirtualKeyboardProvider>
    </div>
  );
};

export default observer(App);

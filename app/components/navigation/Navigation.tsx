import DrawIcon from "@mui/icons-material/Draw";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CasinoIcon from "@mui/icons-material/Casino";

interface NavigationProps {
  highlightedName: string;
  onClick: (id: string) => void;
}
const Navigation = ({ highlightedName, onClick }: NavigationProps) => {
  return (
    <div className="flex justify-center mt-4">
      <button onClick={() => onClick("options-page")}>
        <DrawIcon
          className={`w-8 h-8 mx-2 cursor-pointer ${
            highlightedName === "options-page" ? "text-black" : "text-white"
          }`}
        />
      </button>
      <button onClick={() => onClick("list-page")}>
        <ListAltIcon
          className={`w-8 h-8 mx-2 cursor-pointer ${
            highlightedName === "list-page" ? "text-black" : "text-white"
          }`}
        />
      </button>
      <button onClick={() => onClick("spin-page")}>
        <CasinoIcon
          className={`w-8 h-8 mx-2 cursor-pointer ${
            highlightedName === "spin-page" ? "text-black" : "text-white"
          }`}
        />
      </button>
    </div>
  );
};
Navigation;
export default Navigation;

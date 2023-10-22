import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  placeholder: string;
}
export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearch,
  placeholder,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value as string);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "70%",
        borderRadius: "28px",
        backgroundColor: "#E3E8EF",
        margin: "0 auto",
        color: "#45494F",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
        value={searchTerm}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

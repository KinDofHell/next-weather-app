import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import styles from "./header.module.css";

const Header = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Weather App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

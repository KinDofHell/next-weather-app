import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          <Link href="/">Weather App</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;

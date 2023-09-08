"use client";

import { useState } from "react";

import Logout from "../Logout/Logout";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../Utils/Logo/Logo";
import Button from "../Utils/Button/Button";

import { BiChevronDown } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import FloatingMenu from "../Utils/Select/FloatingMenu";

import styles from "./NavBar.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [displayOptions, setDisplayOptions] = useState(false);

  const { push } = useRouter();

  const { user } = useAuth();

  return (
    <div className={styles.navBarContainer}>
      <Logo cursor="pointer" color="white" onClick={() => push("/dashboard")} />
      <SearchBar />
      <div className={styles.optionsContainer}>
        <div className={styles.userOptions}>
          <Button
            variant="no-padding"
            className={styles.buttonIcon}
            onClick={() => setDisplayOptions(true)}
          >
            My Account
            <BiChevronDown size={17} />
          </Button>
          <div className={styles.optionElements}>
            {displayOptions && (
              <FloatingMenu open={displayOptions} setOpen={setDisplayOptions}>
                <Logout />
              </FloatingMenu>
            )}
          </div>
        </div>
        <div className={styles.userOptions}>
          <Button
            variant="no-padding"
            className={styles.shoppingCart}
            onClick={() => push("/dashboard/shopping-cart")}
          >
            Shopping Cart
            <FaShoppingCart color="white" fill="white" />
          </Button>
          {!!user?.cart.length && (
            <div className={styles.cartProducts}>{user?.cart.length}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

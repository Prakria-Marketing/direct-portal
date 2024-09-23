import { CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";

function ActionButton() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiDotsVerticalRounded />}
      />
      <MenuList>
        <MenuItem icon={<CloseIcon />}>Remove</MenuItem>
        <MenuItem icon={<FiRefreshCw />}>Change Role to Owner</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ActionButton;

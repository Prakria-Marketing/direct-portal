import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

function MyDrawer({
  title,
  isOpen,
  onClose,
  btnRef,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
  children?: ReactNode;
}) {
  return (
    <Drawer
    size={"sm"}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MyDrawer;

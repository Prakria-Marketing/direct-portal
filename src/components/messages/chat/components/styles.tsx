import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Icon as ChakraIcon,
    Badge,
    FlexProps,
    BoxProps,
    HeadingProps,
    TextProps,
    IconProps,
    ImageProps,
    BadgeProps,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FC } from "react";

// Type for Contact Props
interface ContactProps extends FlexProps {
    isActive?: boolean;
}

// Contact Component
export const Contact: FC<ContactProps> = ({ isActive, children, ...props }) => (
    <Flex
        height="72px"
        padding="10px 20px"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="#cdcbcb"
        cursor="pointer"
        bg={isActive ? "#cdcbcb" : "transparent"}
        _hover={{ backgroundColor: "#e3e3e3" }}
        {...props}
    >
        {children}
    </Flex>
);


// AvatarWrapper
export const AvatarWrapper: FC<BoxProps> = (props) => (
    <Box width="50px" height="50px" marginRight="10px" {...props} />
);

// Type for Avatar Props


// Avatar
export const Avatar: FC<ImageProps> = ({ src, ...props }) => (
    <Image
        borderRadius="full"
        height="100%"
        width="100%"
        objectFit="cover"
        src={src}
        {...props}
    />
);

// Content Component
export const Content: FC<BoxProps> = (props) => (
    <Box overflow="hidden" flex="1" {...props} />
);

// TopContent Component
export const TopContent: FC<FlexProps> = (props) => (
    <Flex marginBottom="2px" justifyContent="space-between" alignItems="center" {...props} />
);

// Type for Name Props
// Name Component
export const Name: FC<HeadingProps> = (props) => (
    <Heading
        as="h2"
        fontSize="1rem"
        fontWeight="500"
        color="mainHeadingColor"
        css={css`
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      `}
        {...props}
    />
);

// Time Component
export const Time: FC<TextProps> = (props) => (
    <Text fontSize="0.7rem" color="subHeadingColor" {...props} />
);

// BottomContent Component
export const BottomContent: FC<FlexProps> = (props) => (
    <Flex justifyContent="space-between" alignItems="center" {...props} />
);

// MessageWrapper Component
export const MessageWrapper: FC<FlexProps> = (props) => (
    <Flex
        color="subHeadingColor"
        fontSize="0.85rem"
        marginRight="3px"
        overflow="hidden"
        justifyContent="space-between"
        alignItems="center"
        {...props}
    />
);

// Type for MessageStatusIcon Props
interface MessageStatusIconProps extends IconProps {
    isRead?: boolean;
}

// MessageStatusIcon Component
export const MessageStatusIcon: FC<MessageStatusIconProps> = ({ isRead, ...props }) => (
    <ChakraIcon
        color={isRead ? "readIconColor" : "inherit"}
        {...props}
    />
);

// Subtitle Component
export const Subtitle: FC<TextProps> = (props) => (
    <Text marginLeft="3px" {...props} />
);

// UnreadContact Component
export const UnreadContact: FC<BadgeProps> = (props) => (
    <Badge
        color="secondaryColor"
        backgroundColor="tertiaryColor"
        borderRadius="full"
        padding="0 3px"
        height="18px"
        minWidth="18px"
        textAlign="center"
        fontSize="0.75rem"
        fontWeight="500"
        lineHeight="18px"
        verticalAlign="middle"
        {...props}
    />
);

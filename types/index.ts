import { User } from "@prisma/client";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface IMenuProps {
  children: ReactNode;
  isOpen?: boolean;
  setIsOpen: () => void;
  userWidget?: boolean;
  tweetMenu?: boolean;
  headerMenu?: boolean;
}

export interface IMenuItemProps {
  label: string;
  color: "red" | "lightGray";
  icon?: IconType;
  onClick: () => void;
};

export interface IDeleteModalProps {
  isOpen?: boolean;
  setIsOpen: () => void;
  tweetId?: string;
  onSubmit: () => void;
};

export interface IEditUserModalProps {
  user: User;
  mutateUser: () => void;
};

export interface IFormModalProps {
  session: Session;
  placeholder: string;
  buttonLabel: "Post" | "Reply";
};

export interface INotificationProps {
  notification: Record<string, any>;
};

export interface IFollowRecommendation {
  id: string;
  img: any;
  name: string;
  username: string;
  verified: boolean;
  session: Session | null;
  router: AppRouterInstance;
}

export interface ITrend {
  index?: number;
  category?: string;
  hashtag?: string;
  posts?: string;
}

export interface ISidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  notificationsCount: number;
};

export interface ICommentProps {
  comment: Record<string, any>;
};

export interface ICommentsFeedProps {
  comments: Array<object>;
};

export interface ITweetProps {
  tweet: Record<string, any>;
  session: Session;
  isForTweetPage?: boolean;
};

export interface ITweetsFeedProps {
  user?: User;
  session?: Session;
};

export interface IAvatarProps {
  user?: User;
  image?: string;
  hasBorder?: boolean;
  isClickable?: boolean;
};

export interface IUserBioProps {
  user: User;
  session: Session;
};

export interface IUserHeroProps {
  user?: User;
  coverImage?: string;
  profileImage?: string;
  isEditable?: boolean;
  dispatch: ({ type, KEY, value }: any) => void;
};

export interface IUserWidgetProps {
  user?: User;
  hasMenu?: boolean;
  menuOptions?: {
    label?: string;
    onClick?: () => void;
  };
  isAvatarClickable?: boolean;
};

export interface IButtonProps {
  label: string;
  fullWidth?: boolean;
  outlineStyle?: boolean;
  blueStyle?: boolean;
  whiteStyle?: boolean;
  redOutlineStyle?: boolean;
  redFillStyle?: boolean;
  large?: boolean;
  additionalPadding?: boolean;
  disabled?: boolean;
  onClick: () => void;
  providerIcon?: IconType;
};

export interface IFormUtilsProps {
  label: string;
  icon: IconType;
  onClick?: () => void;
};

export interface IFormProps {
  session: Session;
  placeholder: string;
  buttonLabel: string;
  tweetId?: string;
  isModal?: boolean;
};

export interface IHeaderProps {
  label: string;
  showBackArrow?: boolean;
  session?: Session;
};

export interface IInputProps {
  label: string;
  type: string;
  state?: string;
  isTextarea?: boolean;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  KEY: string;
  dispatch: ({ type, KEY, value }: any) => void;
};

export interface ILoaderProps {
  message?: string;
  isForFullPage?: boolean;
};

export interface IModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  position: "topCenter" | "center";
  hasTransparentHeader?: boolean;
  hasButtonOnTop?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  buttonLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isFormModal?: boolean;
  formModalContent?: React.ReactElement;
};

export interface ITwitterXProps {
  color: string;
  size: string;
};

// zustard store types

export interface IEditUserStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export interface IFormStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export interface ILoginStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export interface IRegisterStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
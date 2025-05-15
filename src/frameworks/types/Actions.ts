import User from "../../models/User.ts";
import Room from "../../models/Room.ts";
import RoomTemplate from "../../models/RoomTemplate.ts";
import Group from "../../models/Group.ts";
import PromotionArticle from "../../models/PromotionArticle.ts";
import Notification from "../../models/Notification.ts";
import Alert from "../../models/Alert.ts";
import {PublicRoomDto} from "../../models/dto/public/PublicRoomDto.ts";
import {PublicUserDto} from "../../models/dto/public/PublicUserDto.ts";
import {RestrictedUserDto} from "../../models/dto/restricted/RestrictedUserDto.ts";
import {PublicAlertDto} from "../../models/dto/public/PublicAlertDto.ts";

export type Action = () => void;

export type UserAction = (user: PublicUserDto|RestrictedUserDto) => void;

export type RoomAction = (room: PublicRoomDto) => void;

export type RoomTemplateAction = (template: RoomTemplate) => void;

export type GroupAction = (group: Group) => void;

export type PromotionArticleAction = (promotionArticle: PromotionArticle) => void;

export type NotificationAction = (notification: Notification) => void;

export type AlertAction = (alert: PublicAlertDto) => void;
import User from "../../models/User.ts";
import Room from "../../models/Room.ts";
import RoomTemplate from "../../models/RoomTemplate.ts";
import Group from "../../models/Group.ts";
import PromotionArticle from "../../models/PromotionArticle.ts";
import Notification from "../../models/Notification.ts";
import Alert from "../../models/Alert.ts";

export type Action = () => void;

export type UserAction = (user: User) => void;

export type RoomAction = (room: Room) => void;

export type RoomTemplateAction = (template: RoomTemplate) => void;

export type GroupAction = (group: Group) => void;

export type PromotionArticleAction = (promotionArticle: PromotionArticle) => void;

export type NotificationAction = (notification: Notification) => void;

export type AlertAction = (alert: Alert) => void;
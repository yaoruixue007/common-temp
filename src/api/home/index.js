import request from '@/request/request'
import lightApp from "../../sdk/lightAppSDK";

// 调整camera方向
export const setCameraDirection = async (commandName, msg) => {
  return request.put(`/light-app/open-api/core-command/api/v2/device/name/${lightApp.deviceId}/${commandName}`, {[commandName]: 5}, msg)
}

export default {}
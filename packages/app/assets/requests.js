import axios from 'axios';
import Constants from 'expo-constants';
const { manifest } = Constants;

const URI =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(':').shift()}:5000`
    : `https://api.pathalert.hainstech.com`;

export const getId = async (deviceName) => {
  try {
    const res = await axios.post(`${URI}/api/auth`, { deviceName });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGuardians = async (id) => {
  try {
    const res = await axios.get(`${URI}/api/guardians/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteGuardians = async (id, deviceId) => {
  try {
    const res = await axios.delete(`${URI}/api/guardians/${deviceId}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addGuardian = async (id, deviceId) => {
  try {
    await axios.post(`${URI}/api/guardians/${deviceId}/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveNotificationsToken = async (token, deviceId) => {
  try {
    await axios.post(`${URI}/api/auth/token`, { token, deviceId });
  } catch (error) {
    console.log(error.message);
  }
};

export const sendAlert = async (deviceId, lat, lon, safe) => {
  try {
    await axios.post(`${URI}/api/guardians/notify/${deviceId}`, {
      lat,
      lon,
      safe,
    });
  } catch (error) {
    console.log(error.message);
  }
};

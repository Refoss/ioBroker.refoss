'use strict';

const refossdefaults = require('./devices/default').refossdefaults;
const refossem06 = require('./devices/refossem06').refossem06;
const refossem06p = require('./devices/refossem06p').refossem06p;
const refossem16p = require('./devices/refossem16p').refossem16p;
const refossem01p = require('./devices/refossem01p').refossem01p;

const devices = {
    refossem06,
    refossem06p,
    refossem16p,
    refossem01p,
};

const deviceTypes = ['em06', 'em06p', 'em16p', 'em01p'];

/**
 *
 * @param devName device name
 * @returns all devices
 */
function getDeviceByClass(devName) {
    if (devName === 'em06') {
        return { ...devices.refossem06, ...refossdefaults };
    } else if (devName === 'em06p') {
        return { ...devices.refossem06p, ...refossdefaults };
    } else if (devName === 'em16p') {
        return { ...devices.refossem16p, ...refossdefaults };
    } else if (devName === 'em01p') {
        return { ...devices.refossem01p, ...refossdefaults };
    }
}

/**
 *
 * @param deviceClass device name
 * @returns Determine whether the model is supported based on the device name
 */
function getDeviceTypeByClass(deviceClass) {
    return deviceTypes.includes(deviceClass);
}

module.exports = {
    getDeviceByClass,
    getDeviceTypeByClass,
};

'use strict';

const axios = require('axios');
const refossUtils = require('../refoss-utils')

function createHttp(adapter, httpInfo) {
  return new Promise((resolve, reject) => {
    try {
      let data = {
        "header": {
          "from": `/iob/${refossUtils.getRandomString(16)}/sub`,
          "messageId": refossUtils.getRandomString(32),
          "method": 'GET',
          "namespace": httpInfo.http_namespace,
          "payloadVersion": 1,
          "sign": refossUtils.getRandomString(32),
          "timestamp": refossUtils.getTimestampNow(),
          "triggerSrc": "ioBroker",
          "uuid": httpInfo.http_uuid,
        },
        "payload": httpInfo.http_payload
      }
      // @ts-ignore
      axios.post(`http://${httpInfo.http_ip}/config`, data, { timeout: 15000 }).then(res => {
        resolve(res.data.payload)
        return res.data.payload
      }).catch(error => {
        if (error.code === 'ECONNABORTED') {
          adapter.log.error(`request timed out`)
        } else {
          adapter.log.error(`axios Error ${error}`)
        }
      });
    } catch (error) {
      adapter.log.error(`axios Error ${error}`)
    }
  })
}

module.exports = { createHttp }
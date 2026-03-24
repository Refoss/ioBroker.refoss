'use strict';

const Channels = Object.freeze({
    A1: 1,
});

const keysArr = [
    {
        apiKey: 'power',
        emKey: 'Power',
        name: 'Power',
        unit: 'W',
    },
    {
        apiKey: 'mConsume',
        emKey: 'ThisMonthEnergy',
        name: 'This Month Energy',
        unit: 'kWh',
    },
    {
        apiKey: 'today',
        emKey: 'TodayEnergy',
        name: 'Today Energy',
        unit: 'kWh',
    },
    {
        apiKey: 'todayX',
        emKey: 'TodayEnergyReturned',
        name: 'Today Energy Returned',
        unit: 'kWh',
    },
    {
        apiKey: 'week',
        emKey: 'WeekEnergy',
        name: 'Week Energy',
        unit: 'kWh',
    },
    {
        apiKey: 'weekX',
        emKey: 'WeekEnergyReturned',
        name: 'Week Energy Returned',
        unit: 'kWh',
    },
    {
        apiKey: 'mConsume',
        emKey: 'ThisMonthEnergy',
        name: 'This Month Energy',
        unit: 'kWh',
    },
    {
        apiKey: 'mConsumeX',
        emKey: 'ThisMonthEnergyReturned',
        name: 'This Month Energy Returned',
        unit: 'kWh',
    },
];

let refossem01p = function () {
    let res = {};
    Object.keys(Channels).forEach(channel => {
        keysArr.forEach(item => {
            res[`${channel}.${item.emKey}`] = {
                http: {
                    http_namespace: 'Appliance.Control.ElectricityX',
                    http_payload: {
                        electricity: [
                            {
                                channel: 0xffff,
                            },
                        ],
                    },
                    http_get_ack: 'electricity',
                    init_funct: self => self.getElectricity(Channels[channel], item.apiKey),
                },
                common: {
                    name: item.name,
                    type: 'number',
                    role: `value.${item.apiKey}`,
                    read: true,
                    write: false,
                    def: 0,
                    unit: item.unit || '',
                },
            };
        });
    });

    return res;
};

module.exports = {
    refossem01p: refossem01p(),
};

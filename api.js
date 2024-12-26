"use strict";

const Homey = require('homey');
const _ = require('lodash-core');


module.exports = {
    async getAdvancedFlows({ homey, query }) {
        return await homey.drivers.getDriver('virtualdevice').getAdvancedFlows({ homey, query });
    },
    async getAdvancedFlowsJSON({ homey, body: { advancedflowsselected } }) {
        return await homey.drivers.getDriver('virtualdevice').getAdvancedFlowsJSON({ homey, advancedflowsselected });
    },
    async readAdvancedFlowsJSON({ homey, body: { exchangerFile } }) {
        return await homey.drivers.getDriver('virtualdevice').readAdvancedFlowsJSON({ homey, exchangerFile });
    },
    async updateAdvancedFlowsJSON({ homey, body: { exchangerFile } }) {
        return await homey.drivers.getDriver('virtualdevice').updateAdvancedFlowsJSON({ homey, exchangerFile });
    },
    async openTemplate({ homey, body: { template } }) {
        return await homey.drivers.getDriver('virtualdevice').openTemplate({ homey, template });
    },
    async refreshTemplates({ homey, query }) {
        return await homey.drivers.getDriver('virtualdevice').getTefTemplatesFromPosts();
    },
    // async getTopics({ homey, query}) {        
    //     return await homey.drivers.getDriver('virtualdevice').getTopics();
    // },
    async getDevices({ homey, query }) {
        return await homey.app.getDevices();
    },
    async getCustomIcons({ homey, query }) {
        return await homey.app.getCustomIcons();
    },
    async setFromDefaultIcon({ homey, body: { customicon, defaulticon, deviceicon } }) {
        return await homey.app.setFromDefaultIcon({ customicon, defaulticon, deviceicon });
    },
    async getIcons({ homey, query }) {
        return await homey.app.getIcons();
    },
    async getIcon({ homey, params: { id } }) {
        return await homey.app.getIcon({ id });
    },
    async createIcon({ homey, body: { type, name, buffer } }) {
        return await homey.app.createIcon({ type, name, buffer });
    },
    async createDeviceIcon({ homey, body: { type, name, buffer, id } }) {
        return await homey.app.createDeviceIcon({ type, name, buffer, id });
    },
    async createCustomIcon({ homey, body: { type, name, buffer, id } }) {
        return await homey.app.createCustomIcon({ type, name, buffer, id });
    },
    async updateIcon({ homey, params: { id }, body: { name } }) {
        return await homey.app.updateIcon({ id, name });
    },
    async deleteIcon({ homey, params: { id } }) {
        return await homey.app.deleteIcon({ id });
    },
    async setFieldName({ homey, body:{ device: deviceId, field: fieldId, name } }) {
        let driver = homey.drivers.getDriver('virtualdevice');
        let devices = await driver.getDevices();
        let device;
        if (deviceId) {
            if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gm.test(deviceId)) device = _.find(devices, d => d.__id == deviceId);
            else device = _.find(devices, d => d.getName() == deviceId);
        }
        if (!device) return "Device not found.";

        //let device = _.find(devices, d=>d.getName()==deviceName || d.__id==deviceId);
        let cap = fieldId && fieldId.indexOf('.') > -1 ? fieldId : device.getStoreValue(fieldId);
        if (fieldId && fieldId.indexOf('.') > -1) fieldId = fieldId.split('.')[1];

        if (device.hasCapability(fieldId)) {
            cap = fieldId;
            fieldId = device.getStoreValue(fieldId);
        }
        else
            cap = device.getStoreValue(fieldId) || cap;

        let args = {device, field:{id:fieldId}, name};
        return await driver.setFieldName(args);
    },
    async setValue({ homey, body: { device: deviceId, field: fieldId, value } }) {
        //let fieldId = field=fieldId;
        let driver = homey.drivers.getDriver('virtualdevice');
        let devices = await driver.getDevices();
        let device;
        if (deviceId) {
            if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gm.test(deviceId)) device = _.find(devices, d => d.__id == deviceId);
            else device = _.find(devices, d => d.getName() == deviceId);
        }
        if (!device) return "Device not found.";

        //let device = _.find(devices, d=>d.getName()==deviceName || d.__id==deviceId);
        let cap = fieldId && fieldId.indexOf('.') > -1 ? fieldId : device.getStoreValue(fieldId);
        if (fieldId && fieldId.indexOf('.') > -1) fieldId = fieldId.split('.')[1];

        if (device.hasCapability(fieldId)) {
            cap = fieldId;
            fieldId = device.getStoreValue(fieldId);
        }
        else
            cap = device.getStoreValue(fieldId) || cap;

        let type = driver.getTypeFromField(fieldId);
        //let  energy = args.device.getEnergy();
        try {
            let oldValue = device.getStoreValue(fieldId + "Value");

            await driver.setSecondCapability({ val: value, device, fieldId });
            await device.setCapabilityValue(cap, value);
            await device.setStoreValue(fieldId + "Value", value);

            if (type == "status") driver.triggerFlowStatus(device, null, value, { field: { id: fieldId }, textChanged: false, textSet: false, numberChanged: oldValue !== value, numberSet: true });
            else if (driver['triggerFlow' + driver.capitalizeFirstLetter(type)]) driver['triggerFlow' + driver.capitalizeFirstLetter(type)].call(driver, device, value, { field: { id: fieldId }, changed: value !== oldValue });

            return true;

        }
        catch (ex) {
            throw ex;
        }

    }
};
// module.exports = [

// 	{
// 		method: 'GET',
// 		path: '/',
// 		fn: async ({}) => {
// 			return Homey.app.getIcons();
// 		},
// 	},

// 	{
// 		method: 'GET',
// 		path: '/',
// 		fn: async ({ params: { id } }) => {
// 			return Homey.app.getIcon({ id });
// 		},
// 	},

// 	{
// 		method: 'POST',
// 		path: '/',
// 		fn: async ({ body: { type, name, buffer } }) => {
// 			return Homey.app.createIcon({
// 				type,
// 				name,
// 				buffer,
// 			});
// 		},
// 	},

// 	{
// 		method		: 'PUT',
// 		path		: '/:id',
// 		fn: async ({ params: { id }, body: {  name } }) => {
// 			return Homey.app.updateIcon({
// 				id,
// 				name,
// 			});
// 		},
// 	},

// 	{
// 		method		: 'DELETE',
// 		path		: '/:id',
// 		fn: async ({ params: { id } }) => {
// 			return Homey.app.deleteIcon({ id });
// 		},
// 	}

// ]
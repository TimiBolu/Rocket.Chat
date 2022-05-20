import type {
	IOmnichannelCannedResponse,
	ILivechatAgent,
	ILivechatDepartment,
	ILivechatDepartmentRecord,
	ILivechatDepartmentAgents,
	ILivechatMonitor,
	ILivechatTag,
	ILivechatVisitor,
	ILivechatVisitorDTO,
	IMessage,
	IOmnichannelRoom,
	IRoom,
	ISetting,
	ILivechatCustomField,
} from '@rocket.chat/core-typings';

import type { PaginatedRequest } from '../helpers/PaginatedRequest';
import type { PaginatedResult } from '../helpers/PaginatedResult';

type booleanString = 'true' | 'false';

export type OmnichannelEndpoints = {
	'livechat/appearance': {
		GET: () => {
			appearance: ISetting[];
		};
	};
	'livechat/visitors.info': {
		GET: (params: { visitorId: string }) => {
			visitor: {
				visitorEmails: Array<{
					address: string;
				}>;
			};
		};
	};
	'livechat/room.onHold': {
		POST: (params: { roomId: IRoom['_id'] }) => void;
	};
	'livechat/room.join': {
		GET: (params: { roomId: IRoom['_id'] }) => { success: boolean };
	};
	'livechat/monitors.list': {
		GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
			monitors: ILivechatMonitor[];
		}>;
	};
	'livechat/tags.list': {
		GET: (params: PaginatedRequest<{ text: string }, 'name'>) => PaginatedResult<{
			tags: ILivechatTag[];
		}>;
	};
	'livechat/department': {
		GET: (
			params: PaginatedRequest<{
				text: string;
				onlyMyDepartments?: booleanString;
				enabled?: boolean;
				excludeDepartmentId?: string;
			}>,
		) => PaginatedResult<{
			departments: ILivechatDepartment[];
		}>;
		POST: (params: { department: Partial<ILivechatDepartment>; agents: string[] }) => {
			department: ILivechatDepartment;
			agents: any[];
		};
	};
	'livechat/department/:_id': {
		GET: (params: { onlyMyDepartments?: booleanString; includeAgents?: booleanString }) => {
			department: ILivechatDepartmentRecord | null;
			agents?: ILivechatDepartmentAgents[];
		};
		PUT: (params: { department: Partial<ILivechatDepartment>[]; agents: any[] }) => {
			department: ILivechatDepartment;
			agents: ILivechatDepartmentAgents[];
		};
		DELETE: () => void;
	};
	'livechat/department.autocomplete': {
		GET: (params: { selector: string; onlyMyDepartments: booleanString }) => {
			items: ILivechatDepartment[];
		};
	};
	'livechat/department/:departmentId/agents': {
		GET: (params: { sort: string }) => PaginatedResult<{ agents: ILivechatDepartmentAgents[] }>;
		POST: (params: { upsert: string[]; remove: string[] }) => void;
	};
	'livechat/departments.available-by-unit/:id': {
		GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
			departments: ILivechatDepartment[];
		}>;
	};
	'livechat/departments.by-unit/': {
		GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
			departments: ILivechatDepartment[];
		}>;
	};

	'livechat/departments.by-unit/:id': {
		GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
			departments: ILivechatDepartment[];
		}>;
	};

	'livechat/department.listByIds': {
		GET: (params: { ids: string[]; fields?: Record<string, unknown> }) => {
			departments: ILivechatDepartment[];
		};
	};

	'livechat/custom-fields': {
		GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
			customFields: ILivechatCustomField[];
		}>;
	};
	'livechat/rooms': {
		GET: (params: {
			guest: string;
			fname: string;
			servedBy: string[];
			status: string;
			department: string;
			from: string;
			to: string;
			customFields: any;
			current: number;
			itemsPerPage: number;
			tags: string[];
		}) => PaginatedResult<{
			rooms: IOmnichannelRoom[];
		}>;
	};
	'livechat/:rid/messages': {
		GET: (params: PaginatedRequest<{ query: string }>) => PaginatedResult<{
			messages: IMessage[];
		}>;
	};
	'livechat/users/agent': {
		GET: (params: PaginatedRequest<{ text?: string }>) => PaginatedResult<{
			users: {
				_id: string;
				emails: {
					address: string;
					verified: boolean;
				}[];
				status: string;
				name: string;
				username: string;
				statusLivechat: string;
				livechat: {
					maxNumberSimultaneousChat: number;
				};
			}[];
		}>;
	};

	'livechat/users/manager/:_id': {
		DELETE: () => { success: boolean };
	};

	'livechat/users/manager': {
		GET: (params: PaginatedRequest<{ text?: string }>) => PaginatedResult<{
			users: ILivechatAgent[];
		}>;
		POST: (params: { username: string }) => { success: boolean };
	};

	'livechat/visitor': {
		POST: (params: { visitor: ILivechatVisitorDTO }) => {
			visitor: ILivechatVisitor;
		};
	};

	'livechat/visitor/:token': {
		GET: (params: { token: string }) => { visitor: ILivechatVisitor };
		DELETE: (params: { token: string }) => {
			visitor: { _id: string; ts: string };
		};
	};

	'livechat/visitor/:token/room': {
		GET: (params: { token: string }) => { rooms: IOmnichannelRoom[] };
	};

	'livechat/visitor.callStatus': {
		POST: (params: { token: string; callStatus: string; rid: string; callId: string }) => {
			token: string;
			callStatus: string;
		};
	};

	'livechat/visitor.status': {
		POST: (params: { token: string; status: string }) => {
			token: string;
			status: string;
		};
	};

	'livechat/queue': {
		GET: (params: {
			agentId?: ILivechatAgent['_id'];
			includeOfflineAgents?: boolean;
			departmentId?: ILivechatAgent['_id'];
			offset: number;
			count: number;
			sort: string;
		}) => {
			queue: {
				chats: number;
				department: { _id: string; name: string };
				user: { _id: string; username: string; status: string };
			}[];
			count: number;
			offset: number;
			total: number;
		};
	};
	'livechat/agents/:uid/departments?enabledDepartmentsOnly=true': {
		GET: () => { departments: ILivechatDepartment[] };
	};

	'canned-responses': {
		GET: (
			params: PaginatedRequest<{
				scope?: string;
				departmentId?: string;
				text?: string;
			}>,
		) => PaginatedResult<{
			cannedResponses: IOmnichannelCannedResponse[];
		}>;
	};

	'livechat/agent.info/:rid/:token': {
		GET: (params: { rid: string; token: string }) => { agent: ILivechatAgent };
	};

	'livechat/agent.next/:token': {
		GET: (params: { token: string; department?: string }) => { agent: ILivechatAgent } | void;
	};

	'livechat/config': {
		GET: (params: { token: string; department?: string; businessUnit: string }) => { config: any };
	};

	'omnichannel/contact': {
		POST: (params: {
			_id?: string;
			token: string;
			name: string;
			username: string;
			email?: string;
			phone?: string;
			customFields?: Record<string, unknown>;
			contactManager?: {
				username: string;
			};
		}) => { contact: string };

		GET: (params: { contactId: string }) => { contact: ILivechatVisitor };
	};

	'omnichannel/contact.search': {
		GET: (params: { email?: string; phone?: string }) => { contact: ILivechatVisitor };
	};

	'livechat/custom.field': {
		POST: (params: { token: string; key: string; value: string; overwrite: boolean }) => {
			field: { key: string; value: string; overwrite: boolean };
		};
	};

	'livechat/custom.fields': {
		POST: (params: { token: string; customFields: { key: string; value: string; overwrite: boolean } }) => {
			fields: {
				Key: string;
				value: string;
				overwrite: boolean;
			}[];
		};
	};

	'livechat/custom-fields/:_id': {
		GET: (params: { id: string }) => { customField: ILivechatCustomField | null };
	};
};

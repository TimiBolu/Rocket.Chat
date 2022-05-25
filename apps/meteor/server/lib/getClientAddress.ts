import type { ISocketConnection } from '@rocket.chat/core-typings';

export const getClientAddress = (connection: Pick<ISocketConnection, 'clientAddress' | 'httpHeaders'>): string => {
	if (!connection) {
		return '';
	}

	const { clientAddress, httpHeaders } = connection;

	return clientAddress || (httpHeaders?.['x-real-ip'] as string);
};

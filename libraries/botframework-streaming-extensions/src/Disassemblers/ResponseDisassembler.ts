/**
 * @module botframework-streaming-extensions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { PayloadTypes } from '../Payloads/PayloadTypes';
import { IResponsePayload } from '../Interfaces/IResponsePayload';
import { PayloadSender } from '../PayloadTransport/PayloadSender';
import { StreamingResponse } from '../StreamingResponse';
import { PayloadDisassembler } from './PayloadDisassembler';
import { IStreamWrapper } from '../Interfaces/IStreamWrapper';

export class ResponseDisassembler extends PayloadDisassembler {
    public readonly response: StreamingResponse;
    public readonly payloadType: PayloadTypes = PayloadTypes.response;

    public constructor(sender: PayloadSender, id: string, response: StreamingResponse) {
        super(sender, id);

        this.response = response;
    }

    public async getStream(): Promise<IStreamWrapper> {
        let payload: IResponsePayload = {statusCode: this.response.statusCode}
        if (this.response.streams) {
            payload.streams = this.DescribePayloadStreams(this.response.streams);
        }
        return PayloadDisassembler.serialize(payload);
    }
}

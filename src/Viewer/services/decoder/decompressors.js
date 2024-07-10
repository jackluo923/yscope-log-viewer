import {XzReadableStream} from "xzwasm";
import {ZstdCodec} from "zstd-codec";


/**
 *
 * @param byteArray
 */
const decompressLzma = async (byteArray) => {
    const stream = new ReadableStream({
        /**
         *
         * @param controller
         */
        start (controller) {
            controller.enqueue(byteArray);
            controller.close();
        },
    });

    const decompressedResponse = new Response(new XzReadableStream(stream));
    return new Uint8Array(await decompressedResponse.arrayBuffer());
};

/**
 *
 * @param data
 */
const decompressZstd = async (data) => {
    const zstd = await new Promise((resolve) => {
        ZstdCodec.run((z) => {
            resolve(z);
        });
    });
    const zstdCtx = new zstd.Streaming();

    return zstdCtx.decompress(data).buffer;
};

export {
    decompressLzma,
    decompressZstd,
};

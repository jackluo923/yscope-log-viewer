/**
 *
 */
const FILE_TYPES = Object.freeze({
    UNKNOWN: "unknown",

    CLP_IR: "clp_ir",
    GZ: "gz",
    TAR_GZ: "tar_gz",
    ZIP: "zip",
    ZST: "zst",
});

/**
 *
 */
const FILE_TYPE_MAGIC_NUMBERS = Object.freeze({
    // NOTE: A typical CLP IR stream is also compressed with Zstandard, so this
    // magic number is checked *after* Zstd decompression.
    [FILE_TYPES.CLP_IR]: [0xfd,
        0x2f,
        0xb5,
        0x29],

    // https://datatracker.ietf.org/doc/html/rfc8878#section-3.1.1
    [FILE_TYPES.ZST]: [0x28,
        0xb5,
        0x2f,
        0xfd],

    // https://datatracker.ietf.org/doc/html/rfc1952#page-6
    // 0x1f: ID1 (IDentification 1): (fixed)
    // 0x8b: ID2 (IDentification 2): (fixed)
    // 0x08: CM (Compression Method): DEFLATE
    // 0x00: FLG (FLaGs): none is set; see below [FILE_TYPES.GZ]
    [FILE_TYPES.TAR_GZ]: [0x1f,
        0x8b,
        0x08,
        0x00],

    // Similar to above except FLG
    // 0x08: Bit 3 (FNAME) set in FLG (FLaGs), which means an original file name
    //       is present, and likely that compressed stream is a single file.
    [FILE_TYPES.GZ]: [0x1f,
        0x8b,
        0x08,
        0x08],

    // https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT
    [FILE_TYPES.ZIP]: [0x50,
        0x4b,
        0x03,
        0x04],
});

export {
    FILE_TYPE_MAGIC_NUMBERS, FILE_TYPES,
};

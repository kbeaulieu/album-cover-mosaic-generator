import Axios from 'axios';
import { Client as DiscogsClient } from 'disconnect';
import { SourceOptions } from '../../core/source-options';

export function getCoversImageByListId(listId: string): Promise<Buffer[]> {
    return getImagesUrl(listId)
        .then(urls => Promise.all(urls.map(fetchImage)));
}

function fetchImage(url: string): Promise<Buffer> {
    return Axios.get(url, { responseType: 'arraybuffer' })
        .then(result => result.data);
}

function getImagesUrl(listId: string): Promise<string[]> {
    if (process.env.MOCK_DISCOGS) {
        console.debug('Using discogs mock');
        return getImagesUrlMock();
    }

    const discogsClient = new DiscogsClient({ userToken: process.env.DISCOGS_USER_TOKEN });

    return discogsClient
        .user()
        .list()
        .getItems(listId)
        .then((resp: any) => resp.items.map((item: any) => item.image_url));
}

function getImagesUrlMock(): Promise<string[]> {
    const segment = 'fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images';
    return new Promise(resolve => resolve([
        `https://img.discogs.com/VsOMkwOohc529V3ZCCpw2BtbB6Y=/${segment}/R-6242217-1508959998-8362.jpeg.jpg`,
        `https://img.discogs.com/KiBQ21I2qCt_h_TEKGzyA-MoRTc=/${segment}/R-2113861-1293853886.jpeg.jpg`,
        `https://img.discogs.com/HCkUERUdY7QL_nX6mqCabwWbKG8=/${segment}/R-6611964-1423074367-8122.jpeg.jpg`,
        `https://img.discogs.com/WjnG54h52PYyCYuvx7QEEhqIZ9Y=/${segment}/R-2326458-1277126967.jpeg.jpg`,
        `https://img.discogs.com/TGECDp0h4o0VqQ0t200um2Kq34o=/${segment}/R-4419202-1413889885-2744.jpeg.jpg`,
        `https://img.discogs.com/sdHBRmgkvd-HvKbnDNra0pKLcaY=/${segment}/R-1059336-1188901800.jpeg.jpg`,
        `https://img.discogs.com/Nu4R5bWmGiefK_y2mo25thgsh5Y=/${segment}/R-12404551-1534607483-5673.jpeg.jpg`,
        `https://img.discogs.com/zbyOvIHhPzsOy9dIH3M-VfFm2gU=/${segment}/R-9871022-1487700007-5003.jpeg.jpg`,
        `https://img.discogs.com/Q5WE4sBvGrE7k0wbEy57rwu1IPg=/${segment}/R-13354040-1552668795-1612.jpeg.jpg`,
        `https://img.discogs.com/tLJsUj-gR-CRDxxg2-Eo1I3kwtY=/${segment}/R-6396450-1418209796-7089.jpeg.jpg`,
        `https://img.discogs.com/8AaXXLSyDMl3u6fDT-fPbsCHUAo=/${segment}/R-13249724-1550709380-8476.jpeg.jpg`,
        `https://img.discogs.com/CA-xRz1Un2K7jXHap59mS7-bMoo=/${segment}/R-2235245-1369236781-8181.jpeg.jpg`,
    ]));
}

export function getSourceOptions(): SourceOptions {
    return {
        coverSize: 300,
    };
}

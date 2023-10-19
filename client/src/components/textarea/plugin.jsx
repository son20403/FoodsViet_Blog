import store from "../../sagas/configureStore";
import { uploadImage } from "../../sagas/posts/request";
const tokenAuth = store.getState().auth.token;
export function uploadPlugin(editor, token = tokenAuth) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader, uploadImage, token);
    };
}
class CustomUploadAdapter {
    constructor(loader, uploadImage, token) {
        this.loader = loader;
        this.uploadImage = uploadImage;
        this.token = token;
    }

    async upload() {
        console.log('Attempting to upload...');
        try {
            const file = await this.loader.file;
            if (!file.type.startsWith('image/')) {
                throw new Error('The uploaded file is not an image.');
            }
            this.loader.uploadTotal = file.size;
            this.loader.uploaded = 0;
            const data = {
                image: file
            };
            const response = await this.uploadImage(this.token, data, {
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log("🚀 ~ file: plugin.jsx:31 ~ CustomUploadAdapter ~ upload ~ progress:", progress)
                    // this.loader.uploadTotal  = progressEvent.loaded;
                    this.loader.uploaded = progressEvent.loaded;
                }
            });
            const responseData = await response?.data;
            if (responseData && responseData.url) {
                this.loader.uploaded = this.loader.uploadTotal;
                return { default: responseData.url };
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error("Upload error: ", error);
            throw error;
        }
    }

}
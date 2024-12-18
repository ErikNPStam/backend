/**
 * @file UploadWithMulter.js
 * @description This module sets up and exports a class for handling file uploads using Multer.
 * @author Mohammad Yusufi
 */

import multer from 'multer';
import path from 'path';

/**
 * Class to handle file uploads using Multer
 */
class UploadWithMulter {
    /**
     * Configuration for Multer storage
     * @private
     */
    private storage = multer.diskStorage({
        /**
         * Sets the destination for uploaded files
         * @param {Object} req - The request object
         * @param {Object} file - The file object
         * @param {Function} cb - Callback function
         */
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        /**
         * Sets the filename for uploaded files
         * @param {Object} req - The request object
         * @param {Object} file - The file object
         * @param {Function} cb - Callback function
         */
        filename: (req, file, cb) => {
            const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExtension = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, fileExtension);
            cb(null, `${baseName}-${uniqueFileName}${fileExtension}`);
        }
    });

    /**
     * Multer instance configured with the storage settings
     * @private
     */
    private upload = multer({ storage: this.storage });

    public single(fieldName: string) {
        return this.upload.single(fieldName);
    }
}

/**
 * Instance of UploadWithMulter class
 * @type {UploadWithMulter}
 */
const uploadWithMulter = new UploadWithMulter();
export default uploadWithMulter;

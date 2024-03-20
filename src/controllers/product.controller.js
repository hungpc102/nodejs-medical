'use strict'

const ProductService = require("../services/product.service")
const ProductServiceV2 = require("../services/product.service.xxx")

const {SuccessResponse } = require("../core/success.response")

class ProductController{

    createProduct = async (req, res, next) => {

         new SuccessResponse({
            message: 'Create new product success!',
            metadata: await ProductServiceV2.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

      // QUERY //
      /**
       * @desc Get all Drafts for shop
       * @param {Number} limit 
       * @param {Number} skip 
       * @return {JSON} 
       */
    getAllDraftsForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list Draft success!',
            metadata: await ProductServiceV2.findAllDraftsForShop({
                product_shop: req.user.userId
            })
        }).send(res)
    }
    // END QUERY //
}

module.exports = new ProductController()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()


module.exports.save = (name, data) => {
  return new Promise((resolve, reject) => {
        const params = {
            // fix the S3 Bucket configuration
          Bucket: 'pizza-luvrs-gm',
          Key: `pizzas/${name}.png`,
          Body: Buffer.from(data, 'base64'),
          ContentEncoding: 'base64',
          ContentType: 'image/png'
        }
        
        s3.putObject(params, (err, data) => {
          if (err) {
            reject(err)
          } else {
              // fix the S3 Bucket configuration
            resolve(`//pizza-luvrs-gm.s3.amazonaws.com/${params.Key}`)
          }
        })
      })
}
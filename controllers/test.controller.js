import OpenAI from "openai";
import dotenv from "dotenv";
import crypto from "crypto";
import moment from "moment";
import axios from "axios";

dotenv.config();

const openai = new OpenAI();

export const generateHmac = async (method, url, secretKey, accessKey) => {
  const parts = url.split(/\?/);
  const [path, query = ""] = parts;
  console.log(url);
  const datetime = moment.utc().format("YYMMDD[T]HHmmss[Z]");
  const message = datetime + method + path + query;
  console.log(message);
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("hex");

  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
};

export const coupangAuth = async (req, res) => {
  const REQUEST_METHOD = "POST";
  const DOMAIN = "https://api-gateway.coupang.com";
  const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";

  // Replace with your own ACCESS_KEY and SECRET_KEY
  const ACCESS_KEY = process.env.COUPANG_ACCESS;
  const SECRET_KEY = process.env.COUPANG_SECRET;
  const REQUEST = {
    coupangUrls: [
      "https://www.coupang.com/np/search?component=&q=good&channel=user",
      "https://www.coupang.com/np/coupangglobal",
    ],
  };
  const authorization = await generateHmac(
    REQUEST_METHOD,
    URL,
    SECRET_KEY,
    ACCESS_KEY
  );
  axios.defaults.baseURL = DOMAIN;
  try {
    const response = await axios.request({
      method: REQUEST_METHOD,
      url: URL,
      headers: { Authorization: authorization },
      data: REQUEST,
    });
    console.log(response.data);
    return authorization;
  } catch (err) {
    console.error(err.response.data);
  }
};

export const imgGenerator = async (req, res, next) => {
  console.log(req.query);
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.query.prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log(response);
  let image_url = response.data[0].url;
  console.log(image_url);
  res.send(image_url);
};

export const tableGenerator = async (req, res, next) => {
  //coupangAuth(req, res);

  const key = encodeURI(req.query.key);
  const REQUEST_METHOD = "GET";
  const DOMAIN = "https://api-gateway.coupang.com";
  const URL = `/v2/providers/affiliate_open_api/apis/openapi/v1/products/search?keyword=${key}&limit=7&imageSize=300x300`;
  const ACCESS_KEY = process.env.COUPANG_ACCESS;
  const SECRET_KEY = process.env.COUPANG_SECRET;

  const authorization = await generateHmac(
    REQUEST_METHOD,
    URL,
    SECRET_KEY,
    ACCESS_KEY
  );
  axios.defaults.baseURL = DOMAIN;
  try {
    const response = await axios.request({
      method: REQUEST_METHOD,
      url: URL,
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });

    const items = response.data.data.productData;
    console.log(items);
    console.log(typeof items);

    let default_html = `<!DOCTYPE html>
  <html>
  <head>
      <style>
          table {
              border-collapse: collapse;
              width: 70%;
          }
  
          th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
          }
  
          th {
              background-color: #87CEEB; /* 하늘색 */
              color: #FFFFFF; /* 흰색 */
          }
  
          td.product-name {
              color: #87CEEB; /* 하늘색 */
          }
      </style>
  </head>
  <body>
      <h3>제품 정보</h3>
      <table border-collapse: collapse;
      width: 70%;>
          <tr>
              <th>이미지</th>
              <th>제품명</th>
              <th>바로가기</th>
          </tr>

  `;
    // items.forEach((element) => {
    //   console.log(element);
    //   default_html =
    //     default_html +
    //     `
    // <tr>
    //           <td><img src="${element.productImage}" alt="제품 이미지"></td>
    //           <td class="product-name">${productName}</td>
    //           <td><a href="${productUrl}"><button>바로가기</button></a></td>
    //       </tr>`;
    // });

    for (const element of items) {
      default_html =
        default_html +
        `
          <tr>
              <td><img src="${element.productImage}" alt="제품 이미지"></td>
              <td class="product-name">${element.productName}</td>
              <td><a href="${element.productUrl}"><button>바로가기</button></a></td>
          </tr>`;
    }
    default_html =
      default_html +
      `     </table>
  </body>
  </html>
  `;
    console.log(default_html);
    return res.send(`${default_html}`);
  } catch (err) {
    console.error(err.response.data);
  }
};

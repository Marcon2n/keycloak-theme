<#macro emailLayout>
<html>
<body>
<div
      style="
        background-color: #f2f5f7;
        color: #242424;
        font-family: 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial,
          sans-serif;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.15008px;
        line-height: 1.5;
        margin: 0;
        padding: 32px 0;
        min-height: 100%;
        width: 100%;
      "
    >
      <table
        align="center"
        width="100%"
        style="
          margin: 0 auto;
          max-width: 600px;
          background-color: #ffffff;
          border-radius: 12px;
        "
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width: 100%">
            <td>
              <div
                style="
                  display: flex;
                  align-items: center;
                  padding: 20px 24px 0px 24px;
                "
              >
                <!-- <img
                  alt="new1"
                  src="./assets/img/image.png"
                  height="50"
                  style="
                    height: 50px;
                    outline: none;
                    border: none;
                    text-decoration: none;
                    vertical-align: middle;
                    display: inline-block;
                    max-width: 100%;
                  "
                /> -->
                <div style="justify-items: first baseline">
                  <img
                    alt="new1"
                    src="https://static.tnex.com.vn/uploads/2022/06/logo.png"
                    style="
                      max-height: 60px;
                      outline: none;
                      border: none;
                      text-decoration: none;
                      vertical-align: middle;
                      display: inline-block;
                      max-width: 100%;
                    "
                  />
                </div>
                <div
                  style="
                    font-weight: 700;
                    font-size: 20px;
                    justify-items: last baseline;
                    width: 100%;
                    height: 100%;
                    text-align: end;
                  "
                >
                  HỆ THỐNG COLLECTION
                </div>
              </div>
              <div style="padding: 10px 24px 30px 24px">
                <hr
                  style="
                    width: 100%;
                    border: none;
                    border-top: 1px solid #eeeeee;
                    margin: 0;
                  "
                />
              </div>
              <h3
                style="
                  font-weight: bold;
                  text-align: left;
                  margin: 0;
                  font-size: 20px;
                  padding: 0px 24px;
                "
              >
                Bạn đang yêu cầu thay đổi mật khẩu?
              </h3>
    <#nested>

    <div style="padding: 16px 24px 16px 24px">
                <hr
                  style="
                    width: 100%;
                    border: none;
                    border-top: 1px solid #eeeeee;
                    margin: 0;
                  "
                />
              </div>
              <div
                style="
                  color: #474849;
                  font-size: 12px;
                  font-weight: normal;
                  text-align: left;
                  padding: 4px 24px 24px 24px;
                "
              >
                Thông báo được gửi đến bạn từ hệ thống Collection
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</body>
</html>
</#macro>

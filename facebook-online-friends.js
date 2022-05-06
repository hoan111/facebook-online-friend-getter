console.clear();
var delayInMilliseconds = 1000;
setTimeout(function () {
    const activeList = require('AvailableListInitialData').activeList;
    processData(activeList);
    async function processData(ids) {
        const url = 'https://www.facebook.com/api/graphql';

        var data = new Object();
        data.ids = ids;
        var _jsonData = JSON.stringify(data);

        const variables = encodeURIComponent(_jsonData);
        const dyn = require("ServerJSDefine").getLoadedModuleHash();
        const csr = require("CSRBitMap").toCompressedString();
        const fb_dtsg = require('DTSGInitialData').token;

        var header = new Headers();
        header.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36");
        header.append("Content-Type", "application/x-www-form-urlencoded");
        const request = new Request(url, {
            headers: header,
            body:
                `__a=1
            &__dyn=${dyn}
            &__csr=${csr}
            &fb_dtsg=${fb_dtsg}
            &fb_api_caller_class=RelayModern
            &fb_api_req_friendly_name=PresenceStatusProviderSubscription_ContactProfilesQuery
            &variables=${variables}
            &server_timestamps=true
            &doc_id=7188178894556645`,
            method: 'POST'
        });
        console.log('%cFacebook online friends getter - Author: Nguyen Khai Hoan - https://fb.com/te.nguyenku', 'background: #222; color: #bada55;font-size: 30px');
        console.log(`%cĐể script hoạt động chuẩn nhất, bạn hãy vào trang https://fb.com sau đó mới sử dụng script này!
        Lưu ý: Script này không thể lấy được hết đầy đủ danh sách người online!`, 'background: #222; color: #FFD700;font-size: 15px')
        console.log('Đang xử lý dữ liệu....');
        await fetch(request).then(response => response.json()).then(data => {
            if (data) {
                console.log('%cXử lí thành công!', 'background: #222; color: #008000');
                for (var i = 0; i < data.data.viewer.chat_sidebar_contact_nodes.length; i++) {
                    console.log(`${i + 1} - FID: ${data.data.viewer.chat_sidebar_contact_nodes[i].id} - Name: ${data.data.viewer.chat_sidebar_contact_nodes[i].name} - Profile: https://fb.com/profile.php?id=${data.data.viewer.chat_sidebar_contact_nodes[i].id} ===> Online Now`);
                }
            }
        }).catch(error => {
            console.log(`%cLỗi: Xử lí dữ liệu thất bại! 
            ${error}`, 'background: #222; color: #DC143C');
        });
    }
}, delayInMilliseconds);

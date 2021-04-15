const mockUndoList = {
    data: [
        {
            status: "div",
            value: "dell lee",
        },
    ],
    success: true,
};
export default {
    get(url) {
        if (url === "/undoList.json") {
            return new Promise((resolve, reject) => {
                if(this.success) {
                    resolve(mockUndoList);
                }else {
                    reject(new Error())
                }
            });
        }
    },
};

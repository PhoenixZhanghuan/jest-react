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
                resolve(mockUndoList);
            });
        }
    },
};

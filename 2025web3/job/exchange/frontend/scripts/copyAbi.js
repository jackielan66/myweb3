const fs = require('fs');

// 源文件路径（要复制的文件）
const sourceFile = 'source.txt';

// 目标文件路径（复制后的文件）
const destinationFile = 'destination.txt';

// 复制文件
fs.copyFile(sourceFile, destinationFile, (err) => {
    if (err) {
        console.error('复制文件失败:', err);
    } else {
        console.log('文件复制成功！');
    }
});

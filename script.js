document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clear');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidthInput = document.getElementById('lineWidth');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // 设置初始画笔样式
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthInput.value;

    // 开始绘制
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // 绘制
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // 停止绘制
    function stopDrawing() {
        isDrawing = false;
    }

    // 清除画布
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // 更新颜色
    function updateColor() {
        ctx.strokeStyle = colorPicker.value;
    }

    // 更新线条宽度
    function updateLineWidth() {
        ctx.lineWidth = lineWidthInput.value;
    }

    // 触摸设备支持
    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }

    function touchStart(e) {
        e.preventDefault();
        const pos = getTouchPos(e);
        isDrawing = true;
        [lastX, lastY] = [pos.x, pos.y];
    }

    function touchMove(e) {
        e.preventDefault();
        if (!isDrawing) return;
        
        const pos = getTouchPos(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        [lastX, lastY] = [pos.x, pos.y];
    }

    // 鼠标事件监听器
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // 触摸事件监听器
    canvas.addEventListener('touchstart', touchStart);
    canvas.addEventListener('touchmove', touchMove);
    canvas.addEventListener('touchend', stopDrawing);

    // 控制按钮事件监听器
    clearButton.addEventListener('click', clearCanvas);
    colorPicker.addEventListener('input', updateColor);
    lineWidthInput.addEventListener('input', updateLineWidth);
});

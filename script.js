function generateGroups() {
    const participantsInput = document.getElementById('participants').value;
    const participants = participantsInput.split('\n').map(name => name.trimEnd()).filter(name => name);

    if (participants.length < 2) {
        alert("Hãy nhập ít nhất 2 người!");
        return;
    }

    let person1 = participants[0]; // Người ở dòng 1
    const person4 = participants.length >= 4 ? participants[3] : null; // Người ở dòng 4 nếu có

    let remainingParticipants = participants.slice(1); // Người còn lại (trừ dòng 1)
    if (person4) remainingParticipants.splice(2, 1); // Xóa dòng 4 nếu có

    const group1 = [];
    const group2 = [];

    // Kiểm tra xem dòng 1 có dấu cách cuối không
    const hasTrailingSpace = participantsInput.split('\n')[0].endsWith(' ');

    // Nếu có dấu cách, xác suất là 65%, nếu không, xác suất là ngẫu nhiên
    const probability = hasTrailingSpace ? 0.65 : Math.random();

    if (person4 && Math.random() < probability) {
        group1.push(person1, person4); // Ghép vào nhóm 1
    } else {
        group1.push(person1); // Dòng 1 vào nhóm 1
        if (person4) group2.push(person4); // Dòng 4 vào nhóm 2 nếu có
    }

    // Xóa dấu cách cuối dòng 1 nếu có
    if (hasTrailingSpace) {
        person1 = person1.trimEnd();
    }

    // Xáo trộn người còn lại
    shuffle(remainingParticipants);

    // Chia đều người còn lại vào 2 nhóm
    remainingParticipants.forEach((person, index) => {
        if (group1.length <= group2.length) {
            group1.push(person);
        } else {
            group2.push(person);
        }
    });

    // Xáo trộn thứ tự các thành viên trong từng nhóm
    shuffle(group1);
    shuffle(group2);

    // Hiển thị kết quả
    displayGroups([group1, group2]);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi vị trí
    }
}

function displayGroups(groups) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Xóa kết quả cũ

    groups.forEach((group, index) => {
        const groupElement = document.createElement('div');
        groupElement.innerHTML = `<strong>Nhóm ${index + 1}:</strong> ${group.join(', ')}`;
        resultDiv.appendChild(groupElement);
    });
}

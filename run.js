//Check simple properties (strings, numbers)
console.log(customFilter(data, {'category': 'sng'}));
console.log(customFilter(data, {'category': 'sng', 'ID': '010'}));
console.log(customFilter(data, {'category': 'sng', 'ID': ['010']}));
console.log(customFilter(data, {'category': ['sng'], 'ID': '010'}));
console.log(customFilter(data, {'category': ['sng'], 'ID': ['010']}));
console.log(customFilter(data, {'category': ['sng','bal'], 'ID': '010'}));
console.log(customFilter(data, {'category': ['sng','bal'], 'ID': ['001','010']}));

//Check objects
console.log(customFilter(data, {'video': 'se_sng_009_en.mp4'}));
console.log(customFilter(data, {'video': ['se_sng_009_en.mp4', 'se_bal_010_nl.mp4']}));
console.log(customFilter(data, {'video': 'se_sng_009_en.mp4', 'ID': '009'}));
console.log(customFilter(data, {'video': ['se_sng_009_en.mp4', 'se_bal_010_nl.mp4'], 'ID': '009'}));

//Check arrays
console.log(customFilter(data, {'regions': 'shoulders'}));
console.log(customFilter(data, {'regions': ['shoulders', 'abdomen']}, 'all', 'all'));
console.log(customFilter(data, {'regions': ['shoulders', 'abdomen'], 'ID': '005'}, 'all', 'all'));
console.log(customFilter(data, {'regions': ['shoulders', 'abdomen'], 'ID': '005'}, 'any', 'all'));
console.log(customFilter(data, {'regions': ['shoulders', 'abdomen'], 'ID': '005'}, 'any', 'any'));
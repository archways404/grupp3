const beers = [
	{
		prod_id: '39602',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39602&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '42442',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=42442&imgType=jpeg',
		price: 41.7,
	},
	{
		prod_id: '18644',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=18644&imgType=jpeg',
		price: 14.5,
	},
	{
		prod_id: '111543',
		title: 'tuborg classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=111543&imgType=jpeg',
		price: 14.5,
	},
	{
		prod_id: '111535',
		title: 'tuborg classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=111535&imgType=jpeg',
		price: 7.5,
	},
	{
		prod_id: '111545',
		title: 'tuborg classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=111545&imgType=jpeg',
		price: 76,
	},
	{
		prod_id: '68916',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68916&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '33354',
		title: 'tuborg fine festival',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33354&imgType=jpeg',
		price: 22,
	},
	{
		prod_id: '39599',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39599&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '29460',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29460&imgType=jpeg',
		price: 6.95,
	},
	{
		prod_id: '68917',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68917&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '42442',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=42442&imgType=jpeg',
		price: 41.7,
	},
	{
		prod_id: '18644',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=18644&imgType=jpeg',
		price: 14.5,
	},
	{
		prod_id: '111543',
		title: 'tuborg classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=111543&imgType=jpeg',
		price: 14.5,
	},
	{
		prod_id: '111535',
		title: 'tuborg classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=111535&imgType=jpeg',
		price: 7.5,
	},
	{
		prod_id: '111545',
		title: 'tuborg classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=111545&imgType=jpeg',
		price: 76,
	},
	{
		prod_id: '39599',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39599&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '33354',
		title: 'tuborg fine festival',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33354&imgType=jpeg',
		price: 22,
	},
	{
		prod_id: '68916',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68916&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '29460',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29460&imgType=jpeg',
		price: 6.95,
	},
	{
		prod_id: '67375',
		title: 'fanø vadehav',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=67375&imgType=jpeg',
		price: 34.95,
	},
	{
		prod_id: '116332',
		title: '1664 rosé',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=116332&imgType=jpeg',
		price: 22,
	},
	{
		prod_id: '120462',
		title: 'lowmotion pink alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=120462&imgType=jpeg',
		price: 24.95,
	},
	{
		prod_id: '126699',
		title: 'white christmas',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=126699&imgType=jpeg',
		price: 12,
	},
	{
		prod_id: '92970',
		title: 'kronenbourg 1664 rose',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=92970&imgType=jpeg',
		price: 13,
	},
	{
		prod_id: '18743',
		title: 'wit blanche',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=18743&imgType=jpeg',
		price: 39,
	},
	{
		prod_id: '29583',
		title: 'royal blå x-mas',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29583&imgType=jpeg',
		price: 36,
	},
	{
		prod_id: '57816',
		title: 'ale no 24',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=57816&imgType=jpeg',
		price: 25,
	},
	{
		prod_id: '18787',
		title: 'ale no 16',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=18787&imgType=jpeg',
		price: 22.95,
	},
	{
		prod_id: '88600',
		title: 'carlsberg nordic pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=88600&imgType=jpeg',
		price: 6.75,
	},
	{
		prod_id: '33352',
		title: 'heineken pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33352&imgType=jpeg',
		price: 6.95,
	},
	{
		prod_id: '33359',
		title: 'heineken pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33359&imgType=jpeg',
		price: 18.95,
	},
	{
		prod_id: '68917',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68917&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '105017',
		title: 'royal classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=105017&imgType=jpeg',
		price: 91.75,
	},
	{
		prod_id: '110378',
		title: 'royal export',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=110378&imgType=jpeg',
		price: 101,
	},
	{
		prod_id: '39599',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39599&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '68915',
		title: 'carlsberg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68915&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '68916',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68916&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '39602',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39602&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '105018',
		title: 'royal pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=105018&imgType=jpeg',
		price: 91.75,
	},
	{
		prod_id: '92967',
		title: 'blonde',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=92967&imgType=jpeg',
		price: 26,
	},
	{
		prod_id: '116349',
		title: 'blonde',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=116349&imgType=jpeg',
		price: 22,
	},
	{
		prod_id: '73884',
		title: 'blonde',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=73884&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '108712',
		title: 'carls jul',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=108712&imgType=jpeg',
		price: 40,
	},
	{
		prod_id: '30859',
		title: 'roulv',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=30859&imgType=jpeg',
		price: 45.5,
	},
	{
		prod_id: '41223',
		title: 'royal pilsner alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=41223&imgType=jpeg',
		price: 30,
	},
	{
		prod_id: '81946',
		title: 'implosion alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=81946&imgType=jpeg',
		price: 27,
	},
	{
		prod_id: '88600',
		title: 'carlsberg nordic pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=88600&imgType=jpeg',
		price: 6.75,
	},
	{
		prod_id: '110454',
		title: 'hyldebryg alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=110454&imgType=jpeg',
		price: 14.95,
	},
	{
		prod_id: '33360',
		title: 'gl carlsberg porter',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33360&imgType=jpeg',
		price: 23.95,
	},
	{
		prod_id: '68916',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68916&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '26366',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=26366&imgType=jpeg',
		price: 13.95,
	},
	{
		prod_id: '29460',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29460&imgType=jpeg',
		price: 6.95,
	},
	{
		prod_id: '90065',
		title: 'grøn tuborg pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=90065&imgType=jpeg',
		price: 15.95,
	},
	{
		prod_id: '90069',
		title: 'grøn tuborg pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=90069&imgType=jpeg',
		price: 8.25,
	},
	{
		prod_id: '92954',
		title: 'grøn tuborg pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=92954&imgType=jpeg',
		price: 76,
	},
	{
		prod_id: '33354',
		title: 'tuborg fine festival',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33354&imgType=jpeg',
		price: 22,
	},
	{
		prod_id: '126084',
		title: 'tuborg classic 0,0% alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=126084&imgType=jpeg',
		price: 30,
	},
	{
		prod_id: '39602',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39602&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '84532',
		title: 'tuborg nul m citrus alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=84532&imgType=jpeg',
		price: 7,
	},
	{
		prod_id: '39599',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39599&imgType=jpeg',
		price: 135,
	},
	{
		prod_id: '29460',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29460&imgType=jpeg',
		price: 6.95,
	},
	{
		prod_id: '26366',
		title: 'grøn tuborg pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=26366&imgType=jpeg',
		price: 13.95,
	},
	{
		prod_id: '92954',
		title: 'grøn tuborg pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=92954&imgType=jpeg',
		price: 76,
	},
	{
		prod_id: '90069',
		title: 'grøn tuborg pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=90069&imgType=jpeg',
		price: 8.25,
	},
	{
		prod_id: '90065',
		title: 'grøn tuborg pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=90065&imgType=jpeg',
		price: 15.95,
	},
	{
		prod_id: '33354',
		title: 'tuborg fine festival',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33354&imgType=jpeg',
		price: 22,
	},
	{
		prod_id: '126084',
		title: 'tuborg classic 0,0% alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=126084&imgType=jpeg',
		price: 30,
	},
	{
		prod_id: '68917',
		title: 'tuborg classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=68917&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '84532',
		title: 'tuborg nul m citrus alkoholfri',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=84532&imgType=jpeg',
		price: 7,
	},
	{
		prod_id: '91362',
		title: 'royal classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=91362&imgType=jpeg',
		price: 74,
	},
	{
		prod_id: '29508',
		title: 'royal classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29508&imgType=jpeg',
		price: 7,
	},
	{
		prod_id: '30251',
		title: 'royal classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=30251&imgType=jpeg',
		price: 19.95,
	},
	{
		prod_id: '39340',
		title: 'royal classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39340&imgType=jpeg',
		price: 42,
	},
	{
		prod_id: '110378',
		title: 'royal export',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=110378&imgType=jpeg',
		price: 101,
	},
	{
		prod_id: '116388',
		title: 'brooklyn pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=116388&imgType=jpeg',
		price: 23.95,
	},
	{
		prod_id: '39771',
		title: 'royal export',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=39771&imgType=jpeg',
		price: 41.7,
	},
	{
		prod_id: '67391',
		title: 'rømø lyset øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=67391&imgType=jpeg',
		price: 37,
	},
	{
		prod_id: '67387',
		title: 'langli classic øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=67387&imgType=jpeg',
		price: 37,
	},
	{
		prod_id: '62785',
		title: 'vægter bryg scottish ale',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=62785&imgType=jpeg',
		price: 35,
	},
	{
		prod_id: '40085',
		title: 'tuborg julebryg',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=40085&imgType=jpeg',
		price: 125,
	},
	{
		prod_id: '29577',
		title: 'tuborg julebryg',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=29577&imgType=jpeg',
		price: 45,
	},
	{
		prod_id: '58588',
		title: 'tuborg julebryg',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=58588&imgType=jpeg',
		price: 20.5,
	},
	{
		prod_id: '41089',
		title: 'kb juleøl',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=41089&imgType=jpeg',
		price: 40,
	},
	{
		prod_id: '58084',
		title: 'juletønden',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=58084&imgType=jpeg',
		price: 37.65,
	},
	{
		prod_id: '62683',
		title: 'sandmilen guldøl',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=62683&imgType=jpeg',
		price: 39.95,
	},
	{
		prod_id: '67386',
		title: 'blåvand hvede øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=67386&imgType=jpeg',
		price: 37,
	},
	{
		prod_id: '126551',
		title: 'mørk guld jul',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=126551&imgType=jpeg',
		price: 12,
	},
	{
		prod_id: '67385',
		title: 'ballum brown øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=67385&imgType=jpeg',
		price: 37,
	},
	{
		prod_id: '116494',
		title: '1866 blanche',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=116494&imgType=jpeg',
		price: 9,
	},
	{
		prod_id: '38788',
		title: 'royal pilsner',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=38788&imgType=jpeg',
		price: 6.5,
	},
	{
		prod_id: '126472',
		title: 'brokilde winter',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=126472&imgType=jpeg',
		price: 15,
	},
	{
		prod_id: '81814',
		title: '45 days pilsner øko',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=81814&imgType=jpeg',
		price: 13.95,
	},
	{
		prod_id: '44522',
		title: 'ceres top classic',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=44522&imgType=jpeg',
		price: 6.25,
	},
	{
		prod_id: '33391',
		title: 'royal stout',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=33391&imgType=jpeg',
		price: 8.5,
	},
	{
		prod_id: '116412',
		title: 'berry barrage',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=116412&imgType=jpeg',
		price: 26.95,
	},
	{
		prod_id: '92972',
		title: 'brune',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=92972&imgType=jpeg',
		price: 89,
	},
	{
		prod_id: '18745',
		title: 'brune',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=18745&imgType=jpeg',
		price: 39,
	},
	{
		prod_id: '126478',
		title: '45 days of xmas',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=126478&imgType=jpeg',
		price: 15,
	},
	{
		prod_id: '18743',
		title: 'wit blanche',
		img: 'https://image.prod.iposeninfra.com/bilkaimg.php?pid=18743&imgType=jpeg',
		price: 39,
	},
];

const filteredProducts = beers.filter((product) => {
	return !product.title.includes('alkoholfri');
});

function removeDuplicates(products) {
	const seenProdIds = new Set();
	const uniqueProducts = products.filter((product) => {
		if (seenProdIds.has(product.prod_id)) {
			return false; // skip this product
		} else {
			seenProdIds.add(product.prod_id);
			return true; // keep this product
		}
	});
	return uniqueProducts;
}

//console.log(filteredProducts);
console.log('Before Dupe-Check: ', filteredProducts.length);

const uniqueProducts = removeDuplicates(filteredProducts);
//console.log(uniqueProducts);

console.log('After Dupe-Check: ', uniqueProducts.length);

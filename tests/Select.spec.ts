import { expect, test, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { SearchPage } from '../Pages/SearchPage';
import { SelectPage } from '../Pages/SelectPage'

test.describe("Select Page Tests", () => {

    let search: SearchPage;
    let select: SelectPage;


    test.beforeEach(async ({ page }) => {

        let login = new LoginPage(page);
       

        await login.gotoLoginPage();
        await login.login('Anita1234', '123456');

    });

        
        const priceData = [
    {label:'1 day',location: 'Brisbane', hotels: undefined, RoomType: undefined, RoomNos: '6 - Six',  Checkin: '24/06/2026', Checkout:'25/06/2026', Adultsno:'4 - Four', childrenno: undefined }, //1 day
    {label:'2 days',location: 'Brisbane', hotels: undefined, RoomType: undefined, RoomNos: '6 - Six',  Checkin: '24/06/2026', Checkout:'25/06/2026', Adultsno:'4 - Four', childrenno: undefined }, // 2 days
    {label:'5 days',location: 'Brisbane', hotels: undefined, RoomType: undefined, RoomNos: '6 - Six',  Checkin: '24/06/2026', Checkout:'29/06/2026', Adultsno:'4 - Four', childrenno: undefined }, //5 days
    {label:'10 days',location: 'Brisbane', hotels: undefined, RoomType: undefined, RoomNos: '6 - Six',  Checkin: '24/06/2026', Checkout:'03/07/2026', Adultsno:'4 - Four', childrenno: undefined },//10 days
    {label:'30 days',location: 'Brisbane', hotels: undefined, RoomType: undefined, RoomNos: '6 - Six',  Checkin: '24/06/2026', Checkout:'25/07/2026', Adultsno:'4 - Four', childrenno: undefined } //30 days
]
    for (const data of priceData) {
    test(`Validate price for ${data.label}`, async ({ page }) => {

         search = new SearchPage(page);
         select = new SelectPage(page);

        await search.SearchHotel(
            data.location,
            data.hotels,
            data.RoomType,
            data.RoomNos,
            data.Checkin,
            data.Checkout,
            data.Adultsno,
            data.childrenno
        );

        await search.SearchButtonClick();
        await expect(select.page).toHaveTitle(/Select Hotel/);
        page.pause();
        console.log('pricepernight locator:', select.pricepernight);

        const priceNightCells= await select.pricepernight.all();
        const nodaysCells=await select.nodays.all();
        const totalpriceCells=await select.totalprice.all();
        const Rooms=await select.Rooms.all();

        console.log('priceNight count:', priceNightCells.length);
    console.log('nodays count:', nodaysCells.length);
    console.log('totalPrice count:', totalpriceCells.length);
    console.log('rooms count:', Rooms.length);

        // '23/06/2026' → split by '/' → ['23', '06', '2026']
    const parts = data.Checkin.split('/');
   
    // rearrange to YYYY-MM-DD
    const checkInDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        // same logic - converting check out
    const parts1=data.Checkout.split('/');
    const checkOutDate = new Date(`${parts1[2]}-${parts1[1]}-${parts1[0]}`);

    // subtracting checkout and checkin

    const diffInMs= checkOutDate.getTime() - checkInDate.getTime();
    const expectedDays=diffInMs/(1000*60*60*24); // converting ms to days
        
        

        for( let i=0;i<nodaysCells.length; i++){
            const pricePerNight = parseFloat((await priceNightCells[i].inputValue()).replace('AUD $ ', ''));
            const noOfDays = parseFloat((await nodaysCells[i].inputValue()).replace(' Days', ''));
            const totalPrice= parseFloat((await totalpriceCells[i].inputValue()).replace('AUD $', ''));
            const roomNbr=parseFloat((await Rooms[i].inputValue()).replace(' Rooms', ''));

             console.log(`Row ${i}: pricePerNight=${pricePerNight}, noOfDays=${noOfDays}, totalPrice=${totalPrice}`);

            expect(expectedDays).toBe(noOfDays);
            expect(totalPrice).toBeCloseTo((pricePerNight*noOfDays*roomNbr));
        }
        


    })

}
})
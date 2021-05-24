namespace TInputLib {
    export function bindImgUploadToDisplayImgTag(inputElmnt: HTMLInputElement, displayTag: HTMLImageElement) {
        //if (typeof $ == 'undefined') {
        //    throw new Error("$ == 'undefined'");
        //}
        inputElmnt.addEventListener("change", function (e) {
            let file = inputElmnt.files[0];
            let reader = new FileReader();
            reader.onloadend = function () {
                displayTag.src = reader.result.toString();
            }
            reader.readAsDataURL(file);
        });
    }
}
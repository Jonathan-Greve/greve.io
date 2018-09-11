using System;
using Microsoft.AspNetCore.Mvc;
using ImagePermutatorLibrary;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.Primitives;
using SixLabors.ImageSharp.PixelFormats;

namespace greve.io.Controllers
{
    [Route("api/[controller]")]
    public class ImagePermutatorController : ControllerBase
    {
        // GET: api/ImagePermutator
        [HttpPost("[action]")]
        public JsonResult GetImageSheet(
            int imageWidth, int imageHeight, int sheetWidth, int sheetHeight,
            float xStartPercent, float yStartPercent, float cropWidthPercent, float cropHeightPercent, [FromBody] string image)
        {
            string[] splitImage = image.Split(",");
            Image<Rgba32> inputImage = StringToImage(splitImage[1]);

            //Convert from percentage values to image-relative values.
            int xStart = (int)(inputImage.Width * (xStartPercent / 100)); 
            int yStart = (int)(inputImage.Height * (yStartPercent / 100));
            int cropHeight = (int)(inputImage.Height * (cropHeightPercent / 100));
            int cropWidth= (int)(inputImage.Width* (cropWidthPercent/ 100));

            ImageSheet sheet = ImageSheet.FromImage(inputImage);
            sheet.SetSheetFormat(new CustomSheet(sheetWidth, sheetHeight));
            sheet.SetImageFormat(new CustomImageFormat(imageWidth, imageHeight));
            sheet.SetCropArea(xStart, yStart, xStart + cropWidth, yStart + cropHeight);
            //Disabled until ImagePermutator library calculates cols and rows correctly on rotation.
            //if(sheetHeight > sheetWidth)
            //{
            //    sheet.SetCroppedImageRotation(270);
            //    sheet.SetOutputImageRotation(90);
            //}
            sheet.Create();

            string outputImageString = sheet.OutputImage.ToBase64String(ImageFormats.Png); 
            inputImage.Dispose();
            sheet.CroppedImage.Dispose();
            sheet.OutputImage.Dispose();
            sheet.SourceImage.Dispose();

            return new JsonResult(outputImageString);
        }

        private Image<Rgba32> StringToImage(string imageString)
        {
            byte[] bytes = Convert.FromBase64String(imageString);
            return Image.Load(bytes);
        }

        // GET: api/ImagePermutator/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImagePermutator
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ImagePermutator/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

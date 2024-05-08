using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalStoreAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MedicalStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public MedicineController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.medicines);
        }

        [HttpGet("{id}")]
        public IActionResult GetMedicineDetails(int id)
        {
            var medicine=_dbContext.medicines.FirstOrDefault(m=>m.MedicineID==id);
            if(medicine==null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        [HttpPost]
        public IActionResult PostMedicineDetails([FromBody]MedicineInfo medicine)
        {
            _dbContext.medicines.Add(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutMedicineDetails(int id, [FromBody]MedicineInfo medicine)
        {
            var medicineOld=_dbContext.medicines.FirstOrDefault(m=>m.MedicineID==id);
            if(medicineOld==null)
            {
                return NotFound();
            }
            medicineOld.MedicineName=medicine.MedicineName;
            medicineOld.MedicineCount=medicine.MedicineCount;
            medicineOld.MedicinePrice=medicine.MedicinePrice;
            medicineOld.MedicineDate=medicine.MedicineDate;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMedicineDetails(int id)
        {
            var medicine=_dbContext.medicines.FirstOrDefault(m=>m.MedicineID==id);
            if(medicine==null)
            {
                return NotFound();
            }
            _dbContext.medicines.Remove(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
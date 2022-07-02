﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ELEMENTS.Data.SQLite;
using ELEMENTS.Infrastructure;

namespace ELEMENTS
{
   
    public class AddItemRepository : IAddItemRepository
    {
        public ISQLiteService Service { get; set; }
        public string Value { get; set; }
        public IDTO Create()
        {
            try
            {
                if (string.IsNullOrEmpty(Value))
                {
                    return null;
                }
               
                // Prepare 
                Guid itemGUID = Guid.NewGuid();
                IInputDTO input = InputDTO.CreateTemplate(
                    itemGUID, Value, Service.Factory.MasterGUID, "ELEMENTs", "Product");
                
                // Create 
                IDTO dto = Service.Factory.Create(input);
                if (dto == null)
                {
                    return null;
                }
                if (dto != null)
                {
                    return dto;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("FAIL: " + ex.Message);
            }

            return null;
        }
        public string ItemType { get; set; } = string.Empty;
    }
}

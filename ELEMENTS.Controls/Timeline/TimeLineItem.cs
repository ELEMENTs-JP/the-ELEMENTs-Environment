﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ELEMENTS.Controls.Timeline
{
    public class TimeLineItem
    {
        public DateTime Date { get; set; } = DateTime.Now.Date;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;

    }
}

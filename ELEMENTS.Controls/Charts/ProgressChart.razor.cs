using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using ELEMENTS.Infrastructure;

namespace ELEMENTS.Controls.Charts
{
    public partial class ProgressChart : IAsyncDisposable
    {
        // Fields 
        private ChartDTO Configuration { get; set; } = new ChartDTO();
        private DotNetObjectReference<ProgressChart>? objRef;
        private Lazy<Task<IJSObjectReference>> moduleTask;


        // ctr 
        public ProgressChart()
        {

        }

        // Events 
        public void Init(IJSRuntime jsRuntime)
        {
            // Import JS File 
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/ELEMENTS.Controls/progress.js").AsTask());
        }

        // Methods 
        public async ValueTask LoadChart(string divID)
        {
            // Reference 
            objRef = DotNetObjectReference.Create(this);

            // Execute function
            var module = await moduleTask.Value;
            await module.InvokeVoidAsync("loadChart", divID, objRef);
        }
        private void LoadDefaultItems()
        {
            // Serie 
            ChartSeriesDTO serie = new ChartSeriesDTO();
            serie.Title = Legende;

            // Default Queries 
            serie.Items.Add(new ChartItemDTO { Y = 1, X = 2, Key = "Progress", Value = this.Progress, Title = "Progress" });
            serie.Items.Add(new ChartItemDTO { Y = 2, X = 3, Key = "Open", Value = (100 - this.Progress), Title = "Open" });

            // Series Append 
            Configuration.Series.Add(serie);
        }


        // JS Methods 
        [JSInvokable]
        public Task<ChartDTO> LoadChartData(JsonElement json)
        {
            Configuration = new ChartDTO();
            try
            {
                Configuration.DIV = json.GetProperty("DIV").GetString();
                Configuration.ItemType = json.GetProperty("ItemType").GetString();
                Configuration.AppType = json.GetProperty("AppType").GetString();
                Configuration.Title = this.Title;
                Configuration.Parameter = json.GetProperty("DataParameter").GetString();
                Configuration.ChartType = json.GetProperty("ChartType").GetString();

                // Items 
                if (this.Items == null || this.Items.Count == 0)
                {
                    LoadDefaultItems();
                }
                else
                {
                    // Serie (max. 1 Serie in diesem Control)
                    ChartSeriesDTO serie = new ChartSeriesDTO();
                    serie.Title = Legende;

                    // Default Queries 
                    foreach (ChartItemDTO dto in Items.Take(2))
                    {
                        serie.Items.Add(dto);
                    }

                    // Series Append 
                    Configuration.Series.Add(serie);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("FAIL: " + ex.Message);
            }

            return Task.FromResult(Configuration);
        }

        // Dispose 
        public async ValueTask DisposeAsync()
        {
            try
            {
                if (moduleTask.IsValueCreated)
                {
                    var module = await moduleTask.Value;
                    await module.DisposeAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("FAIL: " + ex.Message);
            }
        }

        public void Dispose()
        {
            try
            {
                if (moduleTask.IsValueCreated)
                {
                    var module = moduleTask.Value;
                    module.Dispose();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("FAIL: " + ex.Message);
            }
        }
    }


}

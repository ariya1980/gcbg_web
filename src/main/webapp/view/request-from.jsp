<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Insert title here</title>
<%@ include file="/WEB-INF/tag-libraly.jspf" %>
<%@ include file="/WEB-INF/main-menu.jspf" %>
<script src="<%= request.getContextPath() %>/js/select.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/util.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/request-from/request-from-control.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/request-from/request-from-event.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/request-from/request-from-in.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/js/request-from/request-from-out.js" type="text/javascript"></script>
</head>
<body>

<div class="container" id="requertFromInMain" style="background-color: #fff;">
  <br>
  <div class="card-main">
    <div class="card-body">
    	<div class="row">
    		<div class="col-4">
    			<h1 class="text-head">
				<i class="fas fa-file-alt"></i> <span id="headText">Request From In</span>
				</h1>
    		</div>
    		<div class="col-8">
    			<%@include file="/WEB-INF/step-bar.jspf" %>
    		</div>
    	</div>
	    
	<div class="line-head"></div>
      <div class="row">
      <!-- <div class="col-md-4"></div> -->
      <div class="col-md-4">
	       <select class="form-control" style="font-size: 18px; margin-top: 10px;" id="requestType">
	      </select>
	  </div>
	  </div>
        
      <div class="row">
        <div class="col-md-4" id="requestNoDiv">
          <div class="form-group2">
            <label for="req_no" class="text-secondary">Request No</label>
            <input type="text" id="requestNo" class="form-control" value="New Request" disabled>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group2">
            <label for="req_status" class="text-secondary">Request Status</label>
            <input type="text" id="requestStatus" class="form-control" disabled>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group2">
            <label for="last_update" class="text-secondary">Last Update</label>
            <input type="text" id="lastUpdate" class="form-control" disabled>
          </div>
        </div>
      </div>
      
      <div id="bankGuarantee" style="margin-top: 20px;">
      <div class="subhead">
        Bank Guarantee Detetails
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card-dotted">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Form Type</label><br>
                    <div class="form-check form-check-inline">
                      <label class="containerradio">Receipt
                        <input type="radio" checked="checked" name="formType" id="receipt" value="IN" disabled>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="containerradio">Issue
                        <input type="radio" name="formType" id="issue" value="OUT" disabled>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group2">
                    <label class="text-secondary">Company</label><br>
                    <select class="form-control" id="companyCode">
	                </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group2">
                    <label class="text-secondary">BU</label><br>
                    <select class="form-control" id="">
	                </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group2">
                    <label class="text-secondary">Bank</label><br>
                    <select class="form-control" id="bankCode">
	                  <option></option>
	                </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group2">
                    <label class="text-secondary">Document Type</label>
                    <select class="form-control" id="docType">
	            	</select>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Document Name</label>
                    <textarea rows="2" id="docTypeName" class="form-control"></textarea>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Type of Guarantee</label><br>
                    <div class="row" id="TypeOfGuarantee">
                      <div class="col-md-4">
                        <label class="containerradio">Performance
                          <input type="radio" name="typeOfGuarantee" id="performance" value="Performance">
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="col-md-4">
                        <label class="containerradio">Warranty
                          <input type="radio" name="typeOfGuarantee" id="warranty" value="Warranty">
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="col-md-4">
                        <label class="containerradio">Bid Bond
                          <input type="radio" name="typeOfGuarantee" id="bidBond" value="Bid Bond">
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="col-md-4">
                        <label class="containerradio">Advance
                          <input type="radio" name="typeOfGuarantee" id="advance" value="Advance">
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="col-md-8">
                        <label class="containerradio">Retention Bond
                          <input type="radio" name="typeOfGuarantee" id="retentionBond" value="Retention Bond">
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="col-md-4">
                        <label class="containerradio">Other
                          <input type="radio" name="typeOfGuarantee" value="Other" id="typeOfGuarantee" onclick="checkOtherTypeOfGua()">
                          <span class="checkmark"></span>
                        </label>
                      </div>
                      <div class="col-md-8">
                        <input class="form-control" id="typeOfGuaranteeOther">
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card-dotted">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Requestor</label>
                    <b>
                      <p id="requestorName"></p>
                    </b>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group2">
                    <label for="bgd_bg_no" class="text-secondary">BG No.</label>
                    <input class="form-control" id="bgNo" onfocus="setWhiteInput(this)">
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="text-secondary">Amendment No. <span id="amendNo">0</span></label><br>
                  <!-- <div class="form-check form-check-inline">
                    <label class="containerradio">Amendment
                      <input type="radio" name="amendType" id="amendment" value="DECREASE" checked disabled>
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <label class="containerradio">แก้ไขทั่วไป
                      <input type="radio" name="amendType" id="amentEdit" value="" disabled>
                      <span class="checkmark"></span>
                    </label>
                  </div> -->
                  
                  
                </div>
                <div class="col-md-12" id="approverGroup">
                  <div class="form-group2">
                    <label class="text-secondary">Approver</label><br>
                    <select class="form-control" id="approver">
	                </select>
                  </div>
                </div>
                <div class="col-md-12" id="poaGroup">
                  <div class="form-group2">
                    <label class="text-secondary">POA</label><br>
	                <select class="js-example-basic-multiple form-control" id="poa" name="states[]" multiple="multiple">
	                </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" style="margin-top: 20px;">
        <div class="col-md-12">
          <div class="card-dotted">
            <div class="card-body">
              <p class="text-info text-sub-head" style="margin-top: -5px;">Amount</p>
				<table class="table table-borderless" id="tableAmount" style="margin-top: -10px;">
				<thead>
					<tr>
						<th>Amount</th>
						<th width="400px">Currency</th>
						<th class="rate">BOT Selling Rate</th>
					</tr>
				</thead>
				<tbody id="amountTbody">
				</tbody>
				</table>
              
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="row">

        <div class="col-md-4">
          <div class="form-group2">
            <label for="bgd_bg_no" class="text-secondary">Open / Close End</label>
            <select id="openEnd" class="form-control" onchange="checkOpenCloseEnd()">
              <option value="OPEN">Open End</option>
              <option value="CLOSE">Close End</option>
            </select>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group2" id="formEffectiveDate">
            <label class="text-secondary">Efective Date</label>
            <input type="text" id="effectiveDate" class="form-control"  placeholder="dd/mm/yyyy" onclick="getDateEfFx()" onchange="setCalculateDate(); checkDateExtend();">
          </div>

        </div>
        <div class="col-md-4">
          <div class="form-group2" id="formExpiredDate">
            <label class="text-secondary">Expired Date</label>
            <input type="text" id="expiredDate" class="form-control"  placeholder="dd/mm/yyyy" onclick="getDateEfFx()" onchange="setCalculateDate(); checkDateExtend();">
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group2">
            <label class="text-secondary">Period</label>
            <div class="row">
              <div class="col-md-1">
                Year
              </div>
              <div class="col-md-3" class="text-secondary">
                <input class="form-control" id="periodYear" value="" disabled>
              </div>
              <div class="col-md-1">
                Month
              </div>
              <div class="col-md-3" class="text-secondary">
                <input class="form-control" id="periodMonth" value="" disabled>
              </div>
              <div class="col-md-1">
                Day
              </div>
              <div class="col-md-3" class="text-secondary">
                <input class="form-control" id="periodDay" value="" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group2" id="formIssueDate">
            <label class="text-secondary">Issue Date</label>
            <input type="text" id="issueDate" class="form-control"  placeholder="dd/mm/yyyy">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group2" id="treasuryDueDateGroup">
            <label class="text-secondary">Treasury Due Date</label>
            <input type="text" id="treasuryDueDate" class="form-control"  placeholder="dd/mm/yyyy">
          </div>
        </div>
      </div>
      </div>
      <br>
      <div id="contractDetails">
      <div class="subhead">
        Contract Details
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="card-dotted">
            <div class="card-body">
              <p class="text-info text-sub-head" style="margin-top: -5px;">Related To</p>
              <div class="form-group2">
                <div class="form-check form-check-inline">
                  <label class="containerradio">Vendor
                    <input type="radio" name="vendorType" value="V" id="vendor" checked onchange="getSearchName()">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="containerradio">Customer
                    <input type="radio" name="vendorType" value="C" id="customer" onchange="getSearchName()">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" style="margin-top: 20px;">
        <div class="col-md-12">
          <div class="card-dotted">
            <div class="card-body">
              <p class="text-info text-sub-head" style="margin-top: -5px;">Vendor/Customer Info.</p>
              <div class="row">
                <div class="col-12">
                  <div class="form-group2">
                    <label class="text-secondary">Name</label>
                    <select class="form-control" id="vendorCode" onchange="setDataVenCus()">
                      <option></option>
                    </select>
                    <input type="hidden" id="vendorProfile">
                  </div>
                </div>
              <!--   <div class="col-1">
                  <button class="btn-circle btn-secondary btnEvent" style="margin-top: 20px;" data-toggle="modal" data-target=".searchName" id="searchName" onclick="setDataVanCus()"><i
                      class="fas fa-search"></i></button>
                </div> -->
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Address</label>
                    <input class="form-control" id="vendorAddress" disabled>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group2">
                    <label class="text-secondary">City</label>
                    <input class="form-control" id="vendorCity" disabled>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group2">
                    <label class="text-secondary">Country</label>
                    <input class="form-control" id="vendorCountry" disabled>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group2">
                    <label class="text-secondary">Postal Code</label>
                    <input class="form-control" id="vendorPostCode" disabled>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-dotted" style="margin-top: 20px;">
            <div class="card-body">
              <p class="text-info text-sub-head" style="margin-top: -5px;">Project owner / contact person.</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group2">
                    <label class="text-secondary">Name</label>
                    <input class="form-control" id="owner">
                    <input type="hidden" id="ownerId" value="">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group2">
                    <label class="text-secondary">Last Name</label>
                    <input class="form-control" id="ownerLastName">
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Contact Information</label>
                    <textarea rows="2" class="form-control" id="ownerContactInfo"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-dotted" style="margin-top: 20px;" id="returnContactInfo">
            <div class="card-body">
              <p class="text-info text-sub-head" style="margin-top: -5px;">Return Contact Info</p>
              <div class="row">
              	<div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Attention</label>
                    <input type="text" class="form-control" id="returnName">
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group2">
                    <label class="text-secondary">Address</label>
                    <input class="form-control" id="returnAddress">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group2">
                    <label class="text-secondary">City</label>
                    <input class="form-control" id="returnCity">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group2">
                    <label class="text-secondary">Country</label>
                    <input class="form-control" id="returnCountry">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group2">
                    <label class="text-secondary">Postal Code</label>
                    <input class="form-control" id="returnPostCode">
                  </div>
                </div>
              </div>
             </div>
           </div>
          
        </div>
      </div>
      
      <br>
      <div class="card-dotted">
        <div class="card-body">
          <p class="text-info text-sub-head" style="margin-top: -5px;">Detail</p>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group2">
                <label class="text-secondary">PO/SO No.</label>
                <input class="form-control" id="poSoNo">
              </div>
            </div>
            <div class="col-md-1">
              <div class="form-group2">
                <button class="btn-circle btn-secondary btnEvent" style="margin-top: 20px;" onclick="poNoSarch()"><i class="fas fa-search"></i></button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group2">
                <label class="text-secondary">Buyer</label>
                <input type="text" class="form-control" id="buyerName" disabled="disabled">
                <input type="hidden" class="form-control" id="buyerEmployeeID">
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group2">
                <label class="text-secondary">Contract No.</label>
                <input class="form-control" id="contractNo">
              </div>
            </div>
          </div>
          <br>
          <div class="card-dotted">
            <div class="card-body">
              <p class="text-info text-sub-head" style="margin-top: -5px;">Contract Amount</p>
              <table class="table table-borderless" id="contractAmountTable">
              	<thead>
              		<tr>
              			<th>Contract Amount</th>
              			<th>currency</th>
              			<th>Percentage of Guarantee</th>
              			<th width="200px"></th>
              			<th width="100px"></th>
              		</tr>
              	</thead>
              	<tbody id="conAmountTbody">
              	</tbody>
              </table>
              <div>
              </div>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group2">
                <label class="text-secondary">Project/Job</label>
                <textarea class="form-control" id="projectJob"></textarea>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group2" id="expectedDueDateGroup">
                <label class="text-secondary">Contract Expire Date</label>
                <div class="input-group">
                 	<input type="text" id="expectedDueDate" class="form-control"  placeholder="dd/mm/yyyy">
                  <div class="input-group-append">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <br>
      <div class="subhead">
        ATTACHMENT
      </div>
      <div style="margin-top: 20px; min-height: 150px;">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
              aria-selected="true"><i class="far fa-file"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
              aria-selected="false">STORED FILES</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <br>
            <div id="attachment">
            <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr class="text-secondary">
                  <th width="600px">FILE NAME</th>
                  <th>SIZE</th>
                  <th>UPLOAD ON</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="attachFile">
              </tbody>
            </table>
            </div>
            <div class="row" id="fileBrowsBox">
              <div class="col-md-4">
              </div>
              <div class="col-md-4" class="text-center">
               	<input type="file" id="fileBrows" onchange="processFile(this); return false;" style="opacity: 0;">
               	<div class="input-group mb-3">
				  <input type="text" class="form-control browseFile" id="nameFile" placeholder="Browse File" aria-label="Recipient's username" aria-describedby="button-addon2">
				  <div class="input-group-append">
				    <button class="btn bg-secondary text-white browseFile" type="button" id="button-addon2">Browse</button>
				  </div>
				</div>
                <p class="text-secondary text-center">( MAXIMUM FILE SIZE 10MB )</p>
                <center><button type="button" class="btn btn-success" onclick="uploadFile()">UPLOAD FILE</button></center>
              </div>
              <div class="col-md-4">
              </div>
            </div>
            </div>
          </div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <br>
            <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr class="text-secondary">
                  <th>FILE NAME</th>
                  <th>SIZE</th>
                  <th>UPLOAD ON</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="attachFileStored">
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div id="remark">
      <div class="subhead">
        REMARK
      </div>
      <div style="margin-top: 25px;">
      <div id="remarkCreate">
        <div class="row">
          <div class="col-md-2">
            <p class="text-right text-secondary" id="remarkDate"></p>
          </div>
          <div class="col-md-10" style="border-left: 2px solid #117a8b;">
            <textarea rows="4" class="form-control" id="remark"></textarea>
          </div>
        </div>
        <div class="text-right" id="btnRemark" style="margin-top: 10px; margin-bottom: 10px;">
          <button type="button" class="btn btn-info btn-sm" onclick="toggle('remarkHistory')">Other <i class="fas fa-chevron-down"></i></button>
        </div>
        </div>
        <br>
        <div id="remarkHistory">
        </div>

      </div>
      </div>
      <br>
      <div class="text-center" id="buttonEvent">
      
      </div>

      <!-- Button Modify -->
      <div class="text-center" id="buttonModify">
        <button type="button" class="btn btn-warning" onclick="jsonSubmitModify('DRAFT')">DRAFT</button>
        &nbsp;&nbsp;
        <button type="button" class="btn btn-primary" onclick="jsonSubmitModify('SUBMIT')">SUBMIT</button>
        &nbsp;&nbsp;
        <button type="button" class="btn btn-secondary" style="color:#fff;" onclick="goBack()">CANCEL</button>
      </div>
      <br>
    </div>
  </div>
</div>
<br>
<br>
<input type="hidden" id="req_id" value="">
<input type="hidden" id="req_name" value="">
<input type="hidden" id="req_email" value="">
<input type="hidden" id="man_id" value="">
<input type="hidden" id="man_name" value="">
<input type="hidden" id="man_email" value="">
<input type="hidden" id="reqTxnId" value=""> 
<%@ include file="/WEB-INF/footer.jspf" %>

</body>
</html>
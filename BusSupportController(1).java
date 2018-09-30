package com.thinkgem.jeesite.modules.emerg.web;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.utils.ExceptionType;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.common.utils.JsonUtil;
import com.thinkgem.jeesite.common.utils.WebUtil;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.emerg.entity.BusPosition;
import com.thinkgem.jeesite.modules.emerg.entity.SupportBus;
import com.thinkgem.jeesite.modules.emerg.service.BusInfoService;
import com.thinkgem.jeesite.modules.emerg.service.BusPositionService;
import com.thinkgem.jeesite.modules.emerg.service.SupportBusService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 应急管理子系统-公交车接驳
 * 
 * @author laughing
 * @date 2018年2月9日 上午10:55:07
 * @version V1.0
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/emerg/busSupport")
public class BusSupportController extends BaseController {
	
	private static Logger log = Logger.getLogger(BusSupportController.class);
	private static String busPositionUrl = Global.getConfig("bus.position.url");

	@Autowired
	private BusInfoService busInfoService;
	@Autowired
	private SupportBusService supportBusService;
	@Autowired
	private BusPositionService busPositionService;
	
	/**
	 * 获取公交信息列表
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/busInfoList")
	@ResponseBody
	public String busInfoList(HttpServletResponse response) {
		List<HashMap<String,Object>> list = busInfoService.busInfoList();
		return renderString(response, JsonUtil.getSuccessObjJson(list));
	}
	
	/**
	 * 保存接驳公交车信息
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/saveSupportBus")
	@ResponseBody
	public String saveSupportBus(@RequestBody SupportBus supportBus,HttpServletResponse response) {
		supportBus.setSupportBusId(IdGen.uuid());
		boolean b = supportBusService.insert(supportBus);
		if(!b){
			return renderString(response, JsonUtil.getErrJson(ExceptionType.E0005, ExceptionType.E0005.getDesc()));
		}
		return JsonUtil.getSuccessObjJson(null);
	}
	
	/**
	 * 删除接驳公交信息
	 * @param supportBusId
	 */
	@RequestMapping(value = "/deleteSupportBus")
	@ResponseBody
	public String deleteSupportBus(@RequestParam String supportBusId){
		boolean b = supportBusService.deleteSupportBus(supportBusId);
		if(!b){
			return JsonUtil.getErrJson(ExceptionType.E0005, ExceptionType.E0005.getDesc());
		}
		return JsonUtil.getSuccessObjJson(null);
	}
	
	/**
	 * 接驳公交列表
	 * @param faultRecordId
	 * @return
	 */
	@RequestMapping(value = "/supportBusList")
	@ResponseBody
	public String supportBusList(@RequestParam String faultRecordId){
		List<HashMap<String,Object>> list = supportBusService.supportBusList(faultRecordId);
		return JsonUtil.getSuccessObjJson(list);
	}
	
	
	/**
	 * 获取公交位置信息
	 * @param faultRecordId
	 * @param plateNumbers
	 * @return
	 */
	@RequestMapping(value = "/getBusPosition")
	@ResponseBody
	public String getBusPosition(@RequestParam String faultRecordId){
		List<BusPosition> list = new ArrayList<BusPosition>();
		List<String> plateNumberList = new ArrayList<String>();
		List<HashMap<String,Object>> supportBusList = supportBusService.supportBusList(faultRecordId);
		for (HashMap<String, Object> hashMap : supportBusList) {
			plateNumberList.add((String)hashMap.get("plateNumber"));
		}
		if(plateNumberList.isEmpty()){
			return JsonUtil.getSuccessObjJson(list);
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("carno", StringUtils.join(plateNumberList,","));
		JSONArray jsonArray = null;
		try {
			String responseStr = WebUtil.postBody(busPositionUrl, jsonObject.toString());
			if(StringUtils.isNotBlank(responseStr)){
				jsonArray = JSONArray.fromObject(responseStr);
				for(int i=0;i<jsonArray.size();i++){
					JSONObject json = jsonArray.getJSONObject(i);
					BusPosition busPosition = new BusPosition(faultRecordId, 
							new BigDecimal(json.getString("LATITUDE")), 
							new BigDecimal(json.getString("LONGITUDE")), json.getString("VEHICLE_NO"));
					list.add(busPosition);
				}
			}
			if(!list.isEmpty()){
				busPositionService.batchInsert(list);
			}
			return JsonUtil.getSuccessObjJson(list);
		} catch (Exception e) {
			log.info("获取公交车位置信息失败");
			log.info(e);
			return JsonUtil.getErrJson(ExceptionType.E0001, ExceptionType.E0001.getDesc());
		}
	}
	
}
